import { useMutation } from '@tanstack/react-query'
import { type SigninInput } from '@sujalluhar/blog-common'
import { useNavigate } from '@tanstack/react-router'
import api from '@/lib/axios'

export function useSignin() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: SigninInput) =>
            api.post('/api/v1/user/signin', data),
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token)
            navigate({ to: '/blog' })
        },
    })
}