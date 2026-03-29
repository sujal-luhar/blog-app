import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, CalendarDays, Pencil } from "lucide-react"
import { Link } from "@tanstack/react-router"

const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1604949210966-9440c324823f"

interface PostContentProps {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    author: {
        id: string
        name: string | null
    }
}

function readingTime(content: string) {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    })
}

function getStoredUserId() {
    try {
        const token = localStorage.getItem('token')
        if (!token) return null
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.id as string
    } catch {
        return null
    }
}

export default function PostContent({
    id, title, content, createdAt, updatedAt, author
}: PostContentProps) {
    const initials = author.name
        ? author.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'U'

    const isAuthor = getStoredUserId() === author.id
    const wasEdited = createdAt !== updatedAt

    return (
        <article className="max-w-3xl mx-auto">

            <div className="w-full h-100 overflow-hidden mb-8">
                <img
                    src={DEFAULT_THUMBNAIL}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-zinc-100 leading-tight mb-6">
                {title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-zinc-700">
                        <AvatarFallback className="bg-zinc-800 text-amber-400 font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-zinc-200 text-sm font-medium">{author.name ?? 'Anonymous'}</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <CalendarDays className="w-3 h-3" />
                            <span>{formatDate(createdAt)}</span>
                            {wasEdited && <span className="text-zinc-600">· edited</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-500 gap-1.5">
                        <Clock className="w-3 h-3" />
                        {readingTime(content)} min read
                    </Badge>

                    {/* ✅ Edit button only visible to author */}
                    {isAuthor && (
                        <Link to="/blog/edit/$id" params={{ id }}>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="group text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10 gap-2 cursor-pointer transition-all duration-300">
                                <Pencil className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-12" />
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <Separator className="bg-zinc-800 mb-8" />

            {/* Content */}
            <div className="prose prose-invert prose-zinc max-w-none
        prose-headings:text-zinc-100 prose-headings:font-bold
        prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base
        prose-strong:text-zinc-100
        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-amber-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:rounded
        prose-blockquote:border-amber-400 prose-blockquote:text-zinc-400
        prose-hr:border-zinc-800"
            >
                {content.split('\n').map((paragraph, i) =>
                    paragraph.trim()
                        ? <p key={i}>{paragraph}</p>
                        : <br key={i} />
                )}
            </div>

        </article>
    )
}

// ✅ Matching skeleton
export function PostContentSkeleton() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Title */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-full bg-zinc-800" />
                <Skeleton className="h-10 w-2/3 bg-zinc-800" />
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28 bg-zinc-800" />
                        <Skeleton className="h-3 w-20 bg-zinc-800" />
                    </div>
                </div>
                <Skeleton className="h-6 w-24 bg-zinc-800" />
            </div>

            <Separator className="bg-zinc-800" />

            {/* Content paragraphs */}
            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full bg-zinc-800" />
                        <Skeleton className="h-4 w-full bg-zinc-800" />
                        <Skeleton className={`h-4 bg-zinc-800 ${i % 2 === 0 ? 'w-3/4' : 'w-5/6'}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}