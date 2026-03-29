import EditPost from '@/pages/EditPost'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/edit/$id')({
  component: EditPost,
})

