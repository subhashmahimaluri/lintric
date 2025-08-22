import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";

const region = process.env.AWS_REGION || "us-east-1";
export const sqs = new SQSClient({ region });

export async function receive(queueUrl: string) {
  const cmd = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
    VisibilityTimeout: 120,
  });
  const res = await sqs.send(cmd);
  return res.Messages ?? [];
}

export async function del(queueUrl: string, receiptHandle: string) {
  await sqs.send(
    new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    })
  );
}

export async function send(queueUrl: string, body: object) {
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(body),
    })
  );
}
