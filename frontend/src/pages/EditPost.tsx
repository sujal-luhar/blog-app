import Navbar from "@/components/Navbar"
import EditPostForm from "@/components/EditPostForm"
import { PostContentSkeleton } from "@/components/PostContent"
import { useEditPost } from "@/hooks/useEditPost"
import { useBlogPost } from "@/hooks/useBlogPost"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useParams, Link } from "@tanstack/react-router"

export default function EditPost() {
  const { id } = useParams({ from: '/blog/edit/$id' })
  const { data: post, isLoading, isError } = useBlogPost(id)
  const { mutate, isPending, error } = useEditPost(id)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/blog/$id" params={{ id }}>
            <Button
              variant="ghost"
              className="group text-zinc-500 hover:text-zinc-100 hover:bg-transparent gap-2 px-0 cursor-pointer transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Post
            </Button>
          </Link>
          <div className="w-px h-5 bg-zinc-700" />
          <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
        </div>

        {/* Loading */}
        {isLoading && <PostContentSkeleton />}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-zinc-400">Failed to load post.</p>
            <Link to="/blog">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Back to Posts
              </Button>
            </Link>
          </div>
        )}

        {/* Form — only renders when post is loaded */}
        {!isLoading && !isError && post && (
          <EditPostForm
            postId={id}
            initialData={{
              title: post.title,
              content: post.content,
              published: post.published,
            }}
            onSubmit={(data) => mutate(data)}
            isLoading={isPending}
            error={error}
          />
        )}

      </main>
    </div>
  )
}