import AWS from "aws-sdk";
import config from "../config";

AWS.config.update({ region: config.region });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
