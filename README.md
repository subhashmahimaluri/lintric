# Lintric — Lint smarter, measure deeper

AI-powered PR/code health assistant. Lintric ingests pull requests, runs lightweight static checks,
and generates concise AI summaries with actionable fixes. Privacy-first, multi-tenant SaaS.

## Stack (demo phase, PaaS-first)

- **Frontend**: Next.js (App Router, TS)
- **API**: NestJS (Node 20)
- **Workers**: Python/Node (analyzers + AI orchestration)
- **Queues**: Amazon SQS
- **Storage**: S3 (artifacts)
- **Core DB**: RDS Postgres (free tier) — _fallback: MongoDB Atlas M0_
- **NoSQL**: DynamoDB (findings, artifact metadata, AI logs)
- **Platform**: Elastic Beanstalk (Web + Worker)

## Monorepo layout
