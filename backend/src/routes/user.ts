import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, decode, verify } from 'hono/jwt'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs';
import { Bindings, AuthVariables } from '../types'
import { signupSchema, type SignupInput } from '@sujalluhar/blog-common'
import { signinSchema, type SigninInput } from '@sujalluhar/blog-common'

const user = new Hono<{ Bindings: Bindings, Variables: AuthVariables }>()

user.post('/signup', zValidator('json', signupSchema), async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  try {
    const { email, name, password }: SignupInput = await c.req.json()  // ✅ fully typed, no @ts-ignore

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        // ✅ password intentionally excluded — never send it back
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({ user, token }, 201)

  } catch (error: any) {
    // ✅ Handle duplicate email gracefully
    if (error?.code === 'P2002') {
      return c.json({ error: 'Email already in use' }, 409)
    }

    console.error('[signup error]', error)
    return c.json({ error: 'Internal server error' }, 500)

  } finally {
    await prisma.$disconnect()  // ✅ always disconnects even if error thrown
  }
})

user.post('/signin', zValidator('json', signinSchema), async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  try {
    const { email, password }: SigninInput = c.req.valid('json')

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, 
        createdAt: true,
      },
    })

    // Compare even if user doesn't exist — prevents timing attacks
    const dummyHash = '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345'
    const isValid = await bcrypt.compare(password, user?.password ?? dummyHash)

    if (!user || !isValid) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    // Strip password before sending response
    const { password: _, ...safeUser } = user

    return c.json({ user: safeUser, token }, 200)

  } catch (error: any) {
    console.error('[signin error]', error)
    return c.json({ error: 'Internal server error' }, 500)

  } finally {
    await prisma.$disconnect()
  }
})

export default user;
