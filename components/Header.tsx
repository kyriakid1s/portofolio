'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu } from "react-icons/fi";

export default function Header() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const initOpen = () => { setOpen(false) }
    return (
        <header className=" border-b border-white relative">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" onClick={initOpen} className=" text-xl font-bold">
                    $ D. Kyriakidis
                </Link>
                <FiMenu className="md:hidden" onClick={() => setOpen((open) => !open)} />
                <nav className={`md:flex space-x-6 ${open ? "absolute top-full left-0 w-full bg-black border-1 rounded-xl border-white flex flex-col space-y-2 px-4 py-4 z-10" : 'hidden'}`} >
                    <Link href="/about" onClick={initOpen} className={`hover:font-bold ${pathname === '/about' ? "font-bold" : "font-normal"}`}>about</Link>
                    <Link href="/projects" onClick={initOpen} className={`hover:font-bold ${pathname === '/projects' ? "font-bold" : "font-normal"}`}>projects</Link>
                    <Link href="/contact" onClick={initOpen} className={`hover:font-bold ${pathname === '/contact' ? "font-bold" : "font-normal"}`}>contact</Link>
                    <Link href="/blog" onClick={initOpen} className={`hover:font-bold ${pathname === '/blog' ? "font-bold" : "font-normal"}`}>blog</Link>
                </nav>
            </div>
        </header >
    )
}