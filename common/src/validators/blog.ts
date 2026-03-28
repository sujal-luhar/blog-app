import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional().default(false),
})

export const updatePostSchema = z.object({
    id: z.uuid('Invalid post ID'),
    title: z.string().min(1).max(255),
    content: z.string().min(1).optional(),
    published: z.boolean().optional(),
}).refine(
  ({ title, content, published }) => title || content || published !== undefined,
  { message: 'At least one field must be provided to update' }
)

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
