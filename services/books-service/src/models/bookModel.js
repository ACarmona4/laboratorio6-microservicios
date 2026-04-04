import docClient from "../config/dynamo.js";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.BOOKS_TABLE || "tb_books";

export const findAllBooks = async () => {
  const command = new ScanCommand({
    TableName: TABLE,
  });

  const result = await docClient.send(command);
  return result.Items || [];
};

export const findBookById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE,
    Key: {
      id,
    },
  });

  const result = await docClient.send(command);
  return result.Item || null;
};