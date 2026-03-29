import Navbar from "@/components/Navbar"
import CreatePostForm from "@/components/CreatePostForm"
import { useCreatePost } from "@/hooks/useCreatePost"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "@tanstack/react-router"

export default function CreatePost() {
  const { mutate, isPending, error } = useCreatePost()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/blog">
            <Button
              variant="ghost"
              className="group text-zinc-500 hover:text-zinc-100 hover:bg-transparent gap-2 px-0 cursor-pointer transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              All Posts
            </Button>
          </Link>
          <div className="w-px h-5 bg-zinc-700" />
          <h1 className="text-xl font-bold tracking-tight">New Post</h1>
        </div>

        <CreatePostForm
          onSubmit={(data) => mutate(data)}
          isLoading={isPending}
          error={error}
        />

      </main>
    </div>
  )
}