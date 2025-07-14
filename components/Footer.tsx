import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-code-bg border-t border-terminal-green/20 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>© {new Date().getFullYear()} Dimitris Kyriakidis. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="https://github.com/kyriakid1s" className="hover:text-terminal-green transition">
                            GitHub
                        </Link>
                        <Link href="https://linkedin.com/in/dimitriskyriakidiskortsekidis" className="hover:text-terminal-green transition">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}