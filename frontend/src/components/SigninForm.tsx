import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock } from "lucide-react"
import { signinSchema, type SigninInput } from '@sujalluhar/blog-common'
import { AxiosError } from "axios"

interface SigninFormProps {
    onSubmit: (data: SigninInput) => void
    isLoading: boolean
    error: Error | null
}

interface ApiError {
    error: string
}

export default function SigninForm({ onSubmit, isLoading, error }: SigninFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setValidationError] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault()
        setValidationError("")

        const result = signinSchema.safeParse(formData)
        if (!result.success) {
            setValidationError(result.error.message)
            return
        }

        onSubmit(result.data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

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
                <div className="flex items-center justify-between">
                    <Label className="text-zinc-300 text-sm">Password</Label>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
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
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </Button>

        </form>
    )
}