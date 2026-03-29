import CreatePost from '@/pages/CreatePost'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/create')({
  component: CreatePost,
})
