import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2, Save } from "lucide-react"
import { updatePostSchema, type UpdatePostInput } from "@sujalluhar/blog-common"
import { AxiosError } from "axios"

interface EditPostFormProps {
    postId: string
    initialData: {
        title: string
        content: string
        published: boolean
    }
    onSubmit: (data: UpdatePostInput) => void
    isLoading: boolean
    error: Error | null
}

interface ApiError {
    error: string
}

export default function EditPostForm({
    postId,
    initialData,
    onSubmit,
    isLoading,
    error,
}: EditPostFormProps) {
    const [validationError, setValidationError] = useState("")
    const [formData, setFormData] = useState({
        title: initialData.title,
        content: initialData.content,
        published: initialData.published,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault()
        setValidationError("")

        const result = updatePostSchema.safeParse({ id: postId, ...formData })
        if (!result.success) {
            setValidationError(result.error.issues[0].message)
            return
        }

        onSubmit(result.data)
    }

    const wordCount = formData.content.trim()
        ? formData.content.trim().split(/\s+/).length
        : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    // ✅ track if anything actually changed
    const isDirty =
        formData.title !== initialData.title ||
        formData.content !== initialData.content ||
        formData.published !== initialData.published

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* API Error */}
            {error && (
                <Alert className="border-red-500/20 bg-red-500/10 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {error instanceof AxiosError
                            ? (error.response?.data as ApiError)?.error ?? error.message
                            : (error as Error).message}
                    </AlertDescription>
                </Alert>
            )}

            {/* Validation Error */}
            {validationError && (
                <Alert className="border-red-500/20 bg-red-500/10 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                </Alert>
            )}

            {/* Title */}
            <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">Title</Label>
                <Input
                    name="title"
                    type="text"
                    placeholder="Write a compelling title..."
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={255}
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 text-lg font-semibold placeholder:text-zinc-600 placeholder:font-normal focus-visible:ring-amber-400 focus-visible:border-amber-400"
                />
                <p className="text-zinc-600 text-xs text-right">{formData.title.length} / 255</p>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">Content</Label>
                <Textarea
                    name="content"
                    placeholder="Tell your story..."
                    value={formData.content}
                    onChange={handleChange}
                    rows={16}
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400 resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between">
                    <p className="text-zinc-600 text-xs">{wordCount} words</p>
                    <p className="text-zinc-600 text-xs">{readingTime} min read</p>
                </div>
            </div>

            {/* Publish toggle + Submit */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                    <Switch
                        checked={formData.published}
                        onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, published: checked }))
                        }
                        className="data-[state=checked]:bg-amber-400"
                    />
                    <div>
                        <p className="text-zinc-300 text-sm font-medium">
                            {formData.published ? 'Published' : 'Draft'}
                        </p>
                        <p className="text-zinc-600 text-xs">
                            {formData.published ? 'Visible to everyone' : 'Only visible to you'}
                        </p>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !isDirty}  // ✅ disabled if nothing changed
                    className="group bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold gap-2 cursor-pointer transition-all duration-300 disabled:opacity-40"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            {isDirty ? 'Save Changes' : 'No Changes'}
                        </>
                    )}
                </Button>
            </div>

        </form>
    )
}