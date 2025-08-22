import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const region = process.env.AWS_REGION || "us-east-1";
const bucket = process.env.S3_BUCKET!;
export const s3 = new S3Client({ region });

export async function putObject(key: string, body: string | Uint8Array) {
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }));
  return `s3://${bucket}/${key}`;
}
