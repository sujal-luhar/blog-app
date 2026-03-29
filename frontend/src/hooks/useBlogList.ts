import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

interface Post {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  author: {
    id: string
    name: string | null
  }
}

interface BlogListResponse {
  posts: Post[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export function useBlogList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['blogs', page, limit],   // ✅ cache key includes pagination
    queryFn: async () => {
      const response = await api.get<BlogListResponse>(
        `/api/v1/blog/bulk?page=${page}&limit=${limit}`,
      )
      return response.data
    },
  })
}