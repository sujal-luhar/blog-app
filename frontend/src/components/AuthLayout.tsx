import { Pen } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AuthLayoutProps {
  children: React.ReactNode
  badge: string
  heading: string
  subheading: string
  footerText: string
  footerLinkText: string
  footerLinkTo: "/signin" | "/signup"
}

export default function AuthLayout({
  children,
  badge,
  heading,
  subheading,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-zinc-900 border-r border-zinc-800 p-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Pen className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-lg tracking-tight">Blogs</span>
        </Link>

        {/* Quote */}
        <div>
          <div className="w-1.5 h-10 bg-amber-400 rounded-full mb-6" />
          <p className="text-2xl font-light text-zinc-300 leading-relaxed italic">
            "The scariest moment is always just before you start. After that,
            things can only get better."
          </p>
          <p className="mt-4 text-zinc-500 text-sm">— Stephen King</p>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          {[
            { value: "10K+", label: "Writers" },
            { value: "50K+", label: "Posts Published" },
            { value: "100K+", label: "Readers" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-12">
        {/* Mobile Logo */}
        <Link to="/" className="flex lg:hidden items-center gap-2 mb-10">
          <Pen className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-lg tracking-tight">Blogs</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Badge + Heading */}
          <Badge className="bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
            {badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{heading}</h1>
          <p className="text-zinc-400 text-sm mb-8">{subheading}</p>

          {/* Form Content */}
          {children}

          {/* Footer Link */}
          <Separator className="my-6 bg-zinc-800" />
          <p className="text-center text-sm text-zinc-500">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}