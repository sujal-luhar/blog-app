import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type CreatePostInput } from '@sujalluhar/blog-common'

export function useCreatePost() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreatePostInput) =>
      axios.post('https://blog.luharsujal2712.workers.dev/api/v1/blog', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }),
    onSuccess: (response) => {
      navigate({ to: '/blog/$id', params: { id: response.data.post.id } })
    },
  })
}