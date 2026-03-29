import AuthLayout from "@/components/AuthLayout"
import SigninForm from "@/components/SigninForm"
import { useSignin } from "@/hooks/useSignin"

export default function Signin() {
    const { mutate, isPending, error } = useSignin()

    return (
        <AuthLayout
            badge="Welcome Back"
            heading="Sign in to Inkwell"
            subheading="Continue your writing journey where you left off."
            footerText="Don't have an account?"
            footerLinkText="Sign up"
            footerLinkTo="/signup"
        >
            <SigninForm onSubmit={(data) => mutate(data)} isLoading={isPending} error={error} />
        </AuthLayout>
    )
}