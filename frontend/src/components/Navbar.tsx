import { Pen, LogOut, PenLine } from "lucide-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  username?: string
}

export default function Navbar({ username }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate({ to: '/signin' })
  }

  const initials = username
    ? username.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/blog" className="flex items-center gap-2">
          <Pen className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-lg tracking-tight text-zinc-100">Blogs</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link to="/blog/create">
            <Button
              size="sm"
              className="group bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold gap-2 cursor-pointer transition-all duration-300"
            >
              <PenLine className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
              Write
            </Button>
          </Link>

          {/* Avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-9 w-9 border border-zinc-700 hover:border-amber-400 transition-colors">
                <AvatarFallback className="bg-zinc-800 text-amber-400 text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            >
              <div className="px-2 py-1.5 text-sm text-zinc-400">{username ?? 'User'}</div>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-zinc-800 cursor-pointer gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}