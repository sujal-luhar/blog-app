import { type SignupInput } from '@sujalluhar/blog-common'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'

export function useSignup() {
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: (data: SignupInput) =>
            axios.post('https://blog.luharsujal2712.workers.dev/api/v1/user/signup', data),
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token)
            navigate({ to: '/blog' })
        },

    })
}