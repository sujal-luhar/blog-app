import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import type { Bindings, AuthVariables } from '../types'

export const authMiddleware = createMiddleware<{
  Bindings: Bindings
  Variables: AuthVariables
}>(async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Missing or malformed Authorization header' }, 401)
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return c.json({ error: 'Token not provided' }, 401)
    }

    const payload = await verify(token, c.env.JWT_SECRET, 'HS256')

    if (!payload?.id) {
      return c.json({ error: 'Invalid token payload' }, 401)
    }

    // Pass userId downstream — accessible in all blog route handlers
    c.set('userId', payload.id as string)

    await next()

  } catch (error: any) {
    // verify() throws on expired/tampered tokens — must be caught

    if (error?.message?.includes('expired')) {
      return c.json({ error: 'Token expired' }, 401)
    }
    
    return c.json({ error: 'Unauthorized' }, 401)
  }
})

