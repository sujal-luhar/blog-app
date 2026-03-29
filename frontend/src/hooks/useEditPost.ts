import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type UpdatePostInput } from '@sujalluhar/blog-common'

export function useEditPost(postId: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdatePostInput) =>
      axios.put('https://blog.luharsujal2712.workers.dev/api/v1/blog', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }),
    onSuccess: () => {
      // ✅ invalidate cache so BlogPost shows fresh data
      queryClient.invalidateQueries({ queryKey: ['blog', postId] })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate({ to: '/blog/$id', params: { id: postId } })
    },
  })
}