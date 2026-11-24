## LIVE AT: 

**[LINK](https://dk2wxu79mqll8.cloudfront.net/)**

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
