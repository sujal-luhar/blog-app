import BlogList from '@/pages/BlogList'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')
    if (!token) throw redirect({ to: '/signin' })
  },
  component: BlogList,
})
