import { JobMessage } from "../types/messages";
import { putArtifact } from "../utils/dynamo";
import { log } from "../utils/logger";
import { putObject } from "../utils/s3";

export async function handleAnalyzePR(
  msg: Extract<JobMessage, { type: "AnalyzePR" }>
) {
  log.info("AnalyzePR start", { scanId: msg.scanId });

  // TODO: fetch diff via GitHub App token (installationId) & save it
  const patchKey = `tenants/${msg.tenantId}/repos/${msg.repo.owner}/${msg.repo.name}/prs/${msg.pr.number}/scans/${msg.scanId}/diff.patch`;
  await putObject(patchKey, `--- placeholder diff for ${msg.scanId}\n`);

  // TODO: run ESLint/complexity; for now write placeholder files
  const eslintKey = patchKey.replace("diff.patch", "eslint.sarif");
  const complexityKey = patchKey.replace("diff.patch", "complexity.json");
  await putObject(
    eslintKey,
    JSON.stringify({ version: "0.1", results: [] }, null, 2)
  );
  await putObject(
    complexityKey,
    JSON.stringify({ functions: [], score: null }, null, 2)
  );

  // Record artifacts (Dynamo metadata)
  await putArtifact({
    PK: `TENANT#${msg.tenantId}`,
    SK: `SCAN#${msg.scanId}#ART#eslint`,
    scanId: msg.scanId,
    tenantId: msg.tenantId,
    type: "eslint",
    s3Key: eslintKey,
    createdAt: new Date().toISOString(),
  });

  log.info("AnalyzePR done", {
    scanId: msg.scanId,
    artifacts: [patchKey, eslintKey, complexityKey],
  });
  return { artifactKeys: [patchKey, eslintKey, complexityKey] };
}
