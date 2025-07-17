import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-code-bg border-b border-terminal-green/20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-terminal-green text-xl font-bold  transition">
                    $ D. Kyriakidis
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <Link href="/about" className="hover:text-terminal-green transition">about</Link>
                    <Link href="/projects" className="hover:text-terminal-green transition">projects</Link>
                    <Link href="/contact" className="hover:text-terminal-green transition">contact</Link>
                    <Link href="/blog" className="hover:text-terminal-green transition">blog</Link>
                </nav>
            </div>
        </header>
    )
}