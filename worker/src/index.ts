import { startPolling } from "./poller";
import { startServer } from "./server";
import { log } from "./utils/logger";

const mode = (process.env.WORKER_MODE || "poll").toLowerCase();
// "poll"  -> long-poll SQS (local/any compute)
// "http"  -> EB Worker HTTP endpoint
if (mode === "http") {
  startServer();
} else {
  startPolling().catch((e) => {
    log.error("Worker fatal", { error: (e as Error).message });
    process.exit(1);
  });
}
