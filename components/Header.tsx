'use client'
import Link from 'next/link'
import { useState } from 'react';
import { FiMenu } from "react-icons/fi";

export default function Header() {
    const [open, setOpen] = useState(false)
    const initOpen = () => { setOpen(false) }
    return (
        <header className="bg-code-bg border-b border-terminal-green/20 relative">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" onClick={initOpen} className=" text-xl font-bold">
                    $ D. Kyriakidis
                </Link>
                <FiMenu className="md:hidden" onClick={() => setOpen((open) => !open)} />
                <nav className={`md:flex space-x-6 ${open ? "absolute top-full left-0 w-full bg-black border-1 rounded-xl border-white flex flex-col space-y-2 px-4 py-4 z-50 items-center justify-content-center" : 'hidden'}`} >
                    <Link href="/about" onClick={initOpen} className="hover:text-terminal-green transition text-left">about</Link>
                    <Link href="/projects" onClick={initOpen}>projects</Link>
                    <Link href="/contact" onClick={initOpen} >contact</Link>
                    <Link href="/blog" onClick={initOpen}>blog</Link>
                </nav>
            </div>
        </header >
    )
}