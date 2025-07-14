'use client'

import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css' // Choose any theme you prefer

interface CodeBlockProps {
    code: string
    language: string
    className?: string
}

export default function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
    const codeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current)
        }
    }, [code])

    return (
        <div className={`rounded-lg overflow-hidden border border-terminal-green/20 ${className}`}>
            <pre className="m-0 p-4 bg-[#1E1E1E]">
                <code
                    ref={codeRef}
                    className={`hljs language-${language} text-sm`}
                >
                    {code}
                </code>
            </pre>
        </div>
    )
}