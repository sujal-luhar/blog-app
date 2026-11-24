## LIVE AT: 

**[LINK](https://dk2wxu79mqll8.cloudfront.net/)**

## Explained entire project architecture and trade-offs at:

**[BLOG](https://dev.to/sujalluhar/how-i-built-a-blog-app-using-edge-functions-531j)**

(NO AI USED TO WRITE THE BLOG)

## Tech Stack:

Frontend: 

- React 19
- TanStack Router/Query
- Tailwind CSS
- shadcn/Radix UI
- Axios
- Vite
- TypeScript 

Backend: 

- Hono
- Cloudflare Workers/Wrangler
- Prisma ORM
- Neon PostgreSQL
- Zod
- Bcrypt
- PG

Common: 

A shared Zod-powered validation package (@sujalluhar/blog-common) for type-safe contracts across frontend and backend.
Pushed this package to `npm registery`.

## Architecture
```
User
  ↓ HTTPS
CloudFront (global CDN, edge caching)
  ↓ private OAC (Origin Access Control)
S3 (stores dist/ files, not public)
  
User → API calls → Cloudflare Workers (Hono backend)
                        ↓
                  Prisma Accelerate
                        ↓
                    NeonDB (PostgreSQL)
