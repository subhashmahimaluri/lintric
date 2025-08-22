import express from "express";
import { handleAnalyzePR } from "./handlers/analyzePr";
import { handleSummarizePR } from "./handlers/summarizePr";
import type { JobMessage } from "./types/messages";
import { log } from "./utils/logger";

export function startServer() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));

  // EB SQS daemon posts to a single path. Configure this path in EB.
  app.post("/jobs", async (req, res) => {
    const job = req.body as JobMessage;
    try {
      if (job.type === "AnalyzePR") {
        const out = await handleAnalyzePR(job);
        return res.status(200).json({ ok: true, ...out });
      }
      if (job.type === "SummarizePR") {
        const out = await handleSummarizePR(job);
        return res.status(200).json({ ok: true, ...out });
      }
      return res.status(400).json({ ok: false, error: "Unknown job type" });
    } catch (e) {
      log.error("Job failed", { error: (e as Error).message, job });
      return res.status(500).json({ ok: false });
    }
  });

  const port = Number(process.env.PORT || 4000);
  app.listen(port, () => log.info(`EB Worker HTTP listening on ${port}`));
}
