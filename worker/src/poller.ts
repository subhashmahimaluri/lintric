import { handleAnalyzePR } from "./handlers/analyzePr";
import { handleSummarizePR } from "./handlers/summarizePr";
import type { JobMessage } from "./types/messages";
import { log } from "./utils/logger";
import { del, receive, send } from "./utils/sqs";

const ANALYZE_Q = process.env.SQS_ANALYZE_QUEUE_URL!;
const SUMMARIZE_Q = process.env.SQS_SUMMARIZE_QUEUE_URL!;

export async function startPolling() {
  log.info("Worker polling started");
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const msgs = await receive(ANALYZE_Q);
      for (const m of msgs) {
        if (!m.ReceiptHandle || !m.Body) continue;
        const job = JSON.parse(m.Body) as JobMessage;

        if (job.type === "AnalyzePR") {
          const res = await handleAnalyzePR(job);
          await send(SUMMARIZE_Q, {
            type: "SummarizePR",
            tenantId: job.tenantId,
            repo: job.repo,
            pr: job.pr,
            scanId: job.scanId,
            artifactKeys: res.artifactKeys,
          });
        } else if (job.type === "SummarizePR") {
          await handleSummarizePR(job);
        }

        await del(ANALYZE_Q, m.ReceiptHandle);
      }
    } catch (e) {
      log.error("Polling loop error", { error: (e as Error).message });
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}
