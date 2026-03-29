import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Bindings, AuthVariables } from './types'
import user from './routes/user';
import blog from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Bindings, Variables: AuthVariables }>()

app.use(cors())

app.onError((error, c) => {
  console.error(`[global error] ${c.req.method} ${c.req.url}`, error)
  return c.json({ error: 'Internal server error' }, 500)
})

app.notFound((c) => {
  return c.json({ error: `Route ${c.req.method} ${c.req.url} not found` }, 404)
})

app.get('/', async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  const users = await prisma.user.findMany();
  const result = JSON.stringify(users);
  await prisma.$disconnect();

  return c.json(result)
})

app.route('/api/v1/user', user)
app.route('/api/v1/blog', blog)

export default app
