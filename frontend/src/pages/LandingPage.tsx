import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Pen, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Pen className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-lg tracking-tight">Blogs</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/signin">
                        <Button
                            variant="ghost"
                            className="group text-zinc-400 hover:text-zinc-100 hover:bg-transparent cursor-pointer transition-all duration-300 gap-2">
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold cursor-pointer">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                {/* Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 text-sm mb-8">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Your thoughts, beautifully published
                </div>

                {/* Heading */}
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight max-w-3xl">
                    Write what
                    <span className="text-amber-400"> matters.</span>
                    <br />
                    Share what{" "}
                    <span className="italic font-light text-zinc-400">inspires.</span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
                    Blogs is a minimal blogging platform for thinkers, writers, and
                    builders. No noise — just your words and your audience.
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4 mt-10">
                    <Link to="/signup">
                        <Button
                            size="lg"
                            className="group bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 gap-2 cursor-pointer transition-all duration-300"
                        >
                            <Pen className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
                            Start Writing
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link to="/blog">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="group text-zinc-400 hover:text-zinc-100 hover:bg-transparent gap-2 cursor-pointer transition-all duration-300"
                        >
                            <BookOpen className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
                            Browse Posts
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Button>
                    </Link>
                </div>
            </main>

            {/* Features */}
            <section className="border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                {[
                    {
                        title: "Write Freely",
                        desc: "A distraction-free editor that gets out of your way and lets your ideas flow.",
                    },
                    {
                        title: "Publish Instantly",
                        desc: "One click to share your story with readers around the world.",
                    },
                    {
                        title: "Own Your Voice",
                        desc: "Your content, your identity. No algorithms burying what you create.",
                    },
                ].map((feature) => (
                    <div key={feature.title} className="px-10 py-12 hover:bg-zinc-900 transition-colors">
                        <div className="w-1.5 h-6 bg-amber-400 rounded-full mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-800 px-8 py-6 flex items-center justify-between text-zinc-600 text-sm">
                <div className="flex items-center gap-2">
                    <Pen className="w-4 h-4 text-amber-400" />
                    <span>Blogs</span>
                </div>
                <span>Built with Hono + Cloudflare Workers</span>
            </footer>

        </div>
    );
}