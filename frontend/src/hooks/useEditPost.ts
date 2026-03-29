import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type UpdatePostInput } from '@sujalluhar/blog-common'
import api from '@/lib/axios'

export function useEditPost(postId: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdatePostInput) =>
      api.put('/api/v1/blog', data),
    onSuccess: () => {
      // ✅ invalidate cache so BlogPost shows fresh data
      queryClient.invalidateQueries({ queryKey: ['blog', postId] })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate({ to: '/blog/$id', params: { id: postId } })
    },
  })
}