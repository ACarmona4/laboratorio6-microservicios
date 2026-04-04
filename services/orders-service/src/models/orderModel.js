import crypto from "crypto";
import docClient from "../config/dynamo.js";
import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.ORDERS_TABLE || "tb_orders";

export const saveOrder = async ({
  userId,
  bookId,
  bookName,
  quantity,
  unitPrice,
  total,
}) => {
  const newOrder = {
    id: crypto.randomUUID(),
    userId,
    bookId,
    bookName,
    quantity,
    unitPrice,
    total,
    status: "CONFIRMED",
    paymentMethod: "CASH",
    createdAt: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: TABLE,
    Item: newOrder,
  });

  await docClient.send(command);

  return newOrder;
};

export const findOrderById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE,
    Key: {
      id,
    },
  });

  const result = await docClient.send(command);
  return result.Item || null;
};

export const findOrdersByUserId = async (userId) => {
  const command = new ScanCommand({
    TableName: TABLE,
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  const result = await docClient.send(command);
  return result.Items || [];
};