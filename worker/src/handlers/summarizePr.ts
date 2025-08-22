import { JobMessage } from "../types/messages";
import { putAiMessage } from "../utils/dynamo";
import { log } from "../utils/logger";
import { putObject } from "../utils/s3";

export async function handleSummarizePR(
  msg: Extract<JobMessage, { type: "SummarizePR" }>
) {
  log.info("SummarizePR start", { scanId: msg.scanId });

  // TODO: build context from artifacts & call LLM; placeholder summary for now
  const summary = {
    headline: "No critical issues detected (placeholder).",
    topRisks: [],
    quickWins: [],
  };

  const key = `tenants/${msg.tenantId}/repos/${msg.repo.owner}/${msg.repo.name}/prs/${msg.pr.number}/scans/${msg.scanId}/ai-summary.json`;
  await putObject(key, JSON.stringify(summary, null, 2));

  await putAiMessage({
    PK: `TENANT#${msg.tenantId}`,
    SK: `SCAN#${msg.scanId}#STEP#summary`,
    scanId: msg.scanId,
    model: "placeholder",
    tokensIn: 0,
    tokensOut: 0,
    createdAt: new Date().toISOString(),
  });

  log.info("SummarizePR done", { scanId: msg.scanId, summaryKey: key });
  return { summaryKey: key };
}
