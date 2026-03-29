import BlogPost from '@/pages/BlogPost'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$id')({
  component: BlogPost,
})
