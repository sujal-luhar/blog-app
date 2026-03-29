import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface Post {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string | null
  }
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await axios.get<{ post: Post }>(
        `https://blog.luharsujal2712.workers.dev/api/v1/blog/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      return response.data.post
    },
    enabled: !!id,  // ✅ don't fetch if id is undefined
  })
}