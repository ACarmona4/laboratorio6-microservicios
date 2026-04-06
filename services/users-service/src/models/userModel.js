import crypto from 'crypto';
import docClient from '../config/dynamo.js';
import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const TABLE = process.env.USERS_TABLE || 'tb_users';
const memoryUsers = new Map();
let useMemoryOnly = process.env.USERS_STORAGE_MODE === 'memory';

const isRecoverableDynamoError = (error) =>
  ['CredentialsProviderError', 'ResourceNotFoundException', 'AccessDeniedException'].includes(
    error?.name
  );

const runWithStorageFallback = async (dynamoOperation, memoryOperation) => {
  if (useMemoryOnly) {
    return memoryOperation();
  }

  try {
    return await dynamoOperation();
  } catch (error) {
    if (!isRecoverableDynamoError(error)) {
      throw error;
    }

    useMemoryOnly = true;
    console.warn(
      `users-service switched to in-memory storage because DynamoDB is unavailable (${error.name}).`
    );
    return memoryOperation();
  }
};

const buildUser = ({ id = crypto.randomUUID(), name, email, createdAt }) => {
  const now = new Date().toISOString();
  return {
    id,
    name,
    email,
    createdAt: createdAt || now,
    updatedAt: now,
  };
};

const notFoundError = () => {
  const error = new Error('User not found');
  error.name = 'ConditionalCheckFailedException';
  return error;
};

export const saveUser = async ({ name, email }) => {
  const newUser = buildUser({ name, email });

  return runWithStorageFallback(
    async () => {
      const command = new PutCommand({
        TableName: TABLE,
        Item: newUser,
      });

      await docClient.send(command);
      return newUser;
    },
    async () => {
      memoryUsers.set(newUser.id, newUser);
      return newUser;
    }
  );
};

export const findUserById = async (id) => {
  return runWithStorageFallback(
    async () => {
      const command = new GetCommand({
        TableName: TABLE,
        Key: {
          id,
        },
      });

      const result = await docClient.send(command);
      return result.Item || null;
    },
    async () => memoryUsers.get(id) || null
  );
};

export const updateUserById = async (id, payload) => {
  return runWithStorageFallback(
    async () => {
      const fields = [];
      const expressionAttributeNames = {};
      const expressionAttributeValues = {
        ':updatedAt': new Date().toISOString(),
      };

      if (payload.name !== undefined) {
        fields.push('#name = :name');
        expressionAttributeNames['#name'] = 'name';
        expressionAttributeValues[':name'] = payload.name;
      }

      if (payload.email !== undefined) {
        fields.push('#email = :email');
        expressionAttributeNames['#email'] = 'email';
        expressionAttributeValues[':email'] = payload.email;
      }

      fields.push('#updatedAt = :updatedAt');
      expressionAttributeNames['#updatedAt'] = 'updatedAt';

      const command = new UpdateCommand({
        TableName: TABLE,
        Key: { id },
        UpdateExpression: `SET ${fields.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_NEW',
      });

      const result = await docClient.send(command);
      return result.Attributes || null;
    },
    async () => {
      const existingUser = memoryUsers.get(id);
      if (!existingUser) {
        throw notFoundError();
      }

      const updatedUser = buildUser({
        id: existingUser.id,
        name: payload.name !== undefined ? payload.name : existingUser.name,
        email: payload.email !== undefined ? payload.email : existingUser.email,
        createdAt: existingUser.createdAt,
      });

      memoryUsers.set(id, updatedUser);
      return updatedUser;
    }
  );
};
