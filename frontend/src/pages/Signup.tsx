import AuthLayout from "@/components/AuthLayout"
import SignupForm from "@/components/SignupForm"
import { useSignup } from "@/hooks/useSignup"

export default function Signup() {
    const { mutate, isPending, error } = useSignup()
    
    return (
        <AuthLayout
            badge="Join Inkwell"
            heading="Create your account"
            subheading="Start writing and sharing your stories with the world."
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkTo="/signin"
        >
            <SignupForm onSubmit={(data) => mutate(data)} isLoading={isPending} error={error} />
        </AuthLayout>
    )
}