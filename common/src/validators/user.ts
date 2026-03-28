import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).optional(),
})

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
