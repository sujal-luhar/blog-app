import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import { Bindings, AuthVariables } from '../types'
import { authMiddleware } from '../middleware/auth';
import { createPostSchema, type CreatePostInput } from '@sujalluhar/blog-common';
import { updatePostSchema, type UpdatePostInput } from '@sujalluhar/blog-common';

const blog = new Hono<{ Bindings: Bindings, Variables: AuthVariables }>()

blog.use('/*', authMiddleware)

blog.post('/', zValidator('json', createPostSchema), async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

    try {
        const { title, content, published }: CreatePostInput = c.req.valid('json')
        const userId = c.get('userId')

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId: userId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author: {
                    select: { id: true, name: true }
                }
            }
        })

        return c.json({ post }, 201)

    } catch (error: any) {
        console.error('[create post error]', error)
        return c.json({ error: 'Internal server error' }, 500)

    } finally {
        await prisma.$disconnect()
    }
})

blog.put('/', zValidator('json', updatePostSchema), async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

    try {
        const { id, title, content, published }: UpdatePostInput = c.req.valid('json')
        const userId = c.get('userId')

        const existing = await prisma.post.findUnique({
            where: { id },
            select: { authorId: true }
        })

        if (!existing) {
            return c.json({ error: 'Post not found!' }, 404)
        }

        if (existing.authorId !== userId) {
            return c.json({ error: 'Forbidden' }, 403)
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                ...((title !== undefined) && { title }),
                ...(content !== undefined && { content }),
                ...(published !== undefined && { published }),
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return c.json({ post }, 200)

    } catch (error: any) {
        if (error?.code === 'P2025') {
            return c.json({ error: 'Post not found' }, 404)
        }
        console.error('[update post error]', error)
        return c.json({ error: 'Internal server error' }, 500)

    } finally {
        await prisma.$disconnect()

    }
})

blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

    try {
        const page = Math.max(1, Number(c.req.query('page') ?? 1))
        const limit = Math.min(50, Math.max(1, Number(c.req.query('limit') ?? 10))) // cap at 50

        const skip = (page - 1) * limit

        const [posts, total] = await prisma.$transaction([
            prisma.post.findMany({
                where: { published: true },
                select: {
                    id: true,
                    title: true,
                    published: true,
                    createdAt: true,
                    author: {
                        select: { id: true, name: true }
                    }
                    // content intentionally excluded for a list view
                },
                orderBy: { createdAt: 'desc' },  // descending for newest first
                skip,
                take: limit,
            }),
            prisma.post.count({ where: { published: true } })
        ])

        return c.json({
            posts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        }, 200)

    } catch (error: any) {
        console.error('[bulk posts error]', error)
        return c.json({ error: 'Internal server error' }, 500)

    } finally {
        await prisma.$disconnect()
    }
})

blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

    try {
        const id = c.req.param('id')

        if (!z.uuid().safeParse(id).success) {
            return c.json({ error: 'Invalid post ID' }, 400)
        }

        const post = await prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: { id: true, name: true }
                }
            }
        })

        if (!post) {
            return c.json({ error: 'Post not found' }, 404)
        }

        // Unpublished post should only visible to their authers
        if (!post.published && post.author.id !== c.get('userId')) {
            return c.json({ error: 'Forbidden' }, 403)
        }

        return c.json({ post }, 200)

    } catch (error: any) {
        console.error('[get post error]', error)
        return c.json({ error: 'Internal server error' }, 500)

    } finally {
        await prisma.$disconnect()

    }
})

export default blog;