import { Link } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpRight } from "lucide-react"

const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1604949210966-9440c324823f?q=80&w=400"

interface PostCardProps {
  id: string
  title: string
  createdAt: string
  thumbnail?: string
  author: {
    id: string
    name: string | null
  }
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (hours < 48) return 'Yesterday'

  return date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default function PostCard({ id, title, createdAt, thumbnail, author }: PostCardProps) {
  const initials = author.name
    ? author.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <Link to="/blog/$id" params={{ id }}>
      <Card className="group bg-zinc-900 border-zinc-800 hover:border-amber-400/40 transition-all duration-300 cursor-pointer overflow-hidden">
        <CardContent className="p-6">
          <div className="flex gap-5">

            {/* Right — thumbnail */}
            <div className="shrink-0 w-28 h-24 overflow-hidden">
              <img
                src={thumbnail ?? DEFAULT_THUMBNAIL}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>


            {/* Left — text */}
            <div className="flex-1 flex flex-col justify-between gap-4 min-w-0">

              {/* Author + Date */}
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5 border border-zinc-700">
                  <AvatarFallback className="bg-zinc-800 text-amber-400 text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-zinc-400 text-sm">{author.name ?? 'Anonymous'}</span>
                <span className="text-zinc-700">·</span>
                <span className="text-zinc-500 text-sm">{timeAgo(createdAt)}</span>
              </div>

              {/* Title + Arrow */}
              <div className="mb-3 flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold text-zinc-100 leading-snug group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                  {title}
                </h2>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-400 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>


            </div>

          </div>
        </CardContent>
      </Card>
    </Link>
  )
}