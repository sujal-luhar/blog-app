import Signup from '@/pages/Signup'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')
    if (token) throw redirect({ to: '/blog' })
  },
  component: Signup,
})
