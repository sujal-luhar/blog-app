import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

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
      const response = await api.get<{ post: Post }>(
        `/api/v1/blog/${id}`,
      )
      return response.data.post
    },
    enabled: !!id,  // ✅ don't fetch if id is undefined
  })
}