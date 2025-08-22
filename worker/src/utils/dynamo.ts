import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "us-east-1";
const tableFindings = process.env.DYNAMODB_TABLE_FINDINGS!;
const tableArtifacts = process.env.DYNAMODB_TABLE_ARTIFACTS!;
const tableAi = process.env.DYNAMODB_TABLE_AIMSG!;

const ddb = new DynamoDBClient({ region });
export const doc = DynamoDBDocumentClient.from(ddb);

export const tables = { tableFindings, tableArtifacts, tableAi };

export async function putArtifact(item: Record<string, unknown>) {
  await doc.send(new PutCommand({ TableName: tableArtifacts, Item: item }));
}

export async function putAiMessage(item: Record<string, unknown>) {
  await doc.send(new PutCommand({ TableName: tableAi, Item: item }));
}

export async function updateScanHeader(
  scanTable: string,
  key: Record<string, unknown>,
  updateExpr: string,
  values: Record<string, unknown>
) {
  await doc.send(
    new UpdateCommand({
      TableName: scanTable,
      Key: key,
      UpdateExpression: updateExpr,
      ExpressionAttributeValues: values,
    })
  );
}
