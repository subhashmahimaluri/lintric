export type AnalyzePR = {
  type: "AnalyzePR";
  tenantId: string;
  repo: {
    provider: "github";
    owner: string;
    name: string;
    installationId: number;
  };
  pr: { number: number; headSha: string; baseSha?: string; title?: string };
  scanId: string;
};

export type SummarizePR = {
  type: "SummarizePR";
  tenantId: string;
  repo: {
    provider: "github";
    owner: string;
    name: string;
    installationId: number;
  };
  pr: { number: number; headSha: string; title?: string };
  scanId: string;
  artifactKeys?: string[];
};

export type JobMessage = AnalyzePR | SummarizePR;
