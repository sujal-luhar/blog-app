import Navbar from "@/components/Navbar"
import PostContent, { PostContentSkeleton } from "@/components/PostContent"
import { useBlogPost } from "@/hooks/useBlogPost"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useParams, Link } from "@tanstack/react-router"

export default function BlogPost() {
  const { id } = useParams({ from: '/blog/$id' })
  const { data: post, isLoading, isError } = useBlogPost(id)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Back button */}
        <Link to="/blog">
          <Button
            variant="ghost"
            className="group text-zinc-500 hover:text-zinc-100 hover:bg-transparent gap-2 mb-10 px-0 cursor-pointer transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All Posts
          </Button>
        </Link>

        {/* Loading */}
        {isLoading && <PostContentSkeleton />}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-zinc-400">Failed to load post. Please try again.</p>
            <Link to="/blog">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Back to Posts
              </Button>
            </Link>
          </div>
        )}

        {/* Post */}
        {!isLoading && !isError && post && (
          <PostContent {...post} />
        )}

      </main>
    </div>
  )
}