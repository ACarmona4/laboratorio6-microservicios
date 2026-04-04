import crypto from "crypto";
import docClient from "../config/dynamo.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.REVIEWS_TABLE || "tb_reviews";

export const findReviewsByBookId = async (bookId) => {
  const command = new ScanCommand({
    TableName: TABLE,
    FilterExpression: "bookId = :bookId",
    ExpressionAttributeValues: {
      ":bookId": bookId,
    },
  });

  const result = await docClient.send(command);
  return result.Items || [];
};

export const saveReview = async ({ bookId, userId, rating, comment }) => {
  const newReview = {
    id: crypto.randomUUID(),
    bookId,
    userId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: TABLE,
    Item: newReview,
  });

  await docClient.send(command);

  return newReview;
};