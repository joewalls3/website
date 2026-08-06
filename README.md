# Joe Walls — Personal Website

A Next.js portfolio and private owner dashboard for Joe Walls. The public site covers live production, engineering, automation, aviation, and current projects; Clerk provides OAuth and passkey-ready authentication for private tools.

## Stack

- Next.js 16 App Router
- React 19
- Clerk authentication
- OpenAI Responses API
- Vercel deployment

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public homepage works without Clerk keys. Until authentication is connected, `/sign-in` and `/dashboard` show a secure setup state and expose no private data.

## Authentication setup

1. Import this repository into Vercel.
2. Add Clerk from the Vercel Marketplace so `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are provisioned.
3. In Clerk, enable the OAuth providers you want, such as Google and GitHub.
4. Enable passkey sign-in in Clerk.
5. Sign in once, then set `OWNER_CLERK_USER_ID` in Vercel to the user ID shown on `/dashboard`.
6. Redeploy so the owner authorization rule is active.

Authentication and authorization are intentionally separate: Clerk verifies identity, while `OWNER_CLERK_USER_ID` decides who may access private dashboard content and APIs.

## Private website agent

The owner dashboard includes a streamed OpenAI agent for planning, troubleshooting, writing, and technical work. The API route is protected by both Clerk authentication and the owner user ID check.

Add these server-only variables in Vercel:

```text
OPENAI_API_KEY=your-encrypted-project-key
OPENAI_MODEL=gpt-5.6-luna
```

Never prefix the API key with `NEXT_PUBLIC_`. The browser calls `/api/agent`; only the server sends requests to OpenAI. Conversation history currently stays in the browser and is included only with each agent request. The OpenAI request uses `store: false`.

## Key routes

- `/` — public portfolio
- `/sign-in` — OAuth/passkey sign-in
- `/dashboard` — owner-only workspace and agent UI
- `/api/account` — owner-only API example
- `/api/agent` — owner-only streamed agent endpoint

## Deployment

Vercel should detect Next.js automatically. The previous GitHub Pages workflow was removed because production hosting now belongs to Vercel.

### Preview workflow

1. Branch from the latest `main`.
2. Commit and push the branch to GitHub.
3. Build the Vercel preview from that branch.
4. Open and verify the homepage, sign-in, dashboard, and agent routes.
5. Merge or promote only after the preview is confirmed working.
