import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type CreatePostInput } from '@sujalluhar/blog-common'
import api from '@/lib/axios'

export function useCreatePost() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreatePostInput) =>
      api.post('/api/v1/blog', data),
    onSuccess: (response) => {
      navigate({ to: '/blog/$id', params: { id: response.data.post.id } })
    },
  })
}