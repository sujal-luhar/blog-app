## Architecture
```
User
  ↓ HTTPS
CloudFront (global CDN, edge caching)
  ↓ private OAC
S3 (stores dist/ files, not public)
  
User → API calls → Cloudflare Workers (Hono backend)
                        ↓
                  Prisma Accelerate
                        ↓
                    NeonDB (PostgreSQL)