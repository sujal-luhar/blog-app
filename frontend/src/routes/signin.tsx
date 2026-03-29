import Signin from '@/pages/Signin'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')
    if (token) throw redirect({ to: '/blog' })
  },
  component: Signin,
})
