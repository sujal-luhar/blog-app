import Navbar from "@/components/Navbar"
import PostCard from "@/components/PostCard"
import { useBlogList } from "@/hooks/useBlogList"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowLeft, ArrowRight, PenLine } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

function PostCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex gap-5">

        {/* Thumbnail skeleton */}
        <Skeleton className="shrink-0 w-28 h-24 bg-zinc-800" />

        {/* Text skeleton */}
        <div className="flex-1 flex flex-col justify-between gap-4">

          {/* Author + date row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full bg-zinc-800" />
            <Skeleton className="h-3.5 w-24 bg-zinc-800" />
            <Skeleton className="h-3.5 w-16 bg-zinc-800" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full bg-zinc-800" />
            <Skeleton className="h-5 w-2/3 bg-zinc-800" />
          </div>

        </div>

      </div>
    </div>
  )
}

export default function BlogList() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useBlogList(page)
    console.log(data)

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Latest Posts</h1>
                        <p className="text-zinc-500 text-sm mt-1">
                            {data?.meta?.total ?? 0} stories published
                        </p>
                    </div>
                    <Link to="/blog/create">
                        <Button
                            size="sm"
                            className="group bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold gap-2 cursor-pointer transition-all duration-300"
                        >
                            <PenLine className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
                            Write
                        </Button>
                    </Link>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div>
                        {[...Array(5)].map((_, i) => <PostCardSkeleton key={i} />)}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                        <AlertCircle className="w-10 h-10 text-red-400" />
                        <p className="text-zinc-400">Failed to load posts. Please try again.</p>
                        <Button
                            variant="outline"
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !isError && data?.posts?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                        <PenLine className="w-10 h-10 text-zinc-600" />
                        <p className="text-zinc-400">No posts yet. Be the first to write!</p>
                        <Link to="/blog/create">
                            <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold">
                                Write a Post
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Posts */}
                {!isLoading && !isError && data && data?.posts?.length > 0 && (
                    <>
                        <div className="space-y-4">
                            {data.posts.map((post) => (
                                <PostCard key={post.id} {...post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {data?.meta?.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-10">
                                <Button
                                    variant="ghost"
                                    className="group text-zinc-400 hover:text-zinc-100 hover:bg-transparent gap-2 cursor-pointer transition-all duration-300 disabled:opacity-30"
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                >
                                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                    Previous
                                </Button>

                                <span className="text-zinc-500 text-sm">
                                    {page} / {data?.meta?.totalPages}
                                </span>

                                <Button
                                    variant="ghost"
                                    className="group text-zinc-400 hover:text-zinc-100 hover:bg-transparent gap-2 cursor-pointer transition-all duration-300 disabled:opacity-30"
                                    disabled={page === data?.meta?.totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </div>
                        )}
                    </>
                )}

            </main>
        </div>
    )
}