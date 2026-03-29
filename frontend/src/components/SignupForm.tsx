import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, AlertCircle, User, Mail, Lock } from "lucide-react"
import { signupSchema, type SignupInput } from '@sujalluhar/blog-common'
import { AxiosError } from "axios"

interface SignupFormProps {
    onSubmit: (data: SignupInput) => void
    isLoading: boolean
    error: Error | string | null
}

interface ApiError {
    error: string
}

export default function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setValidationError] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        setValidationError("")

        const result = signupSchema.safeParse(formData)
        if (!result.success) {
            setValidationError(result.error.issues[0].message)
            return
        }

        onSubmit(result.data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* API Error from props */}
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

            {/* Zod Validation Error */}
            {validationError && (
                <Alert className="border-red-500/20 bg-red-500/10 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                </Alert>
            )}

            {/* Name */}
            <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold transition-all duration-300 mt-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Create Account"
                )}
            </Button>

        </form>
    )
}