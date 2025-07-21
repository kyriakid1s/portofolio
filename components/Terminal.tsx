'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { FiTerminal, FiX, FiMaximize2 } from 'react-icons/fi'
import { createPortal } from 'react-dom'

type Command = {
    description: string
    execute: (args?: string[]) => string | string[]
}

type TerminalOutput = {
    text: string | string[]
    isCommand: boolean
    isError?: boolean
}

const commands: Record<string, Command> = {
    help: {
        description: 'Show available commands',
        execute: () => Object.entries(commands).map(([cmd, { description }]) =>
            `${cmd.padEnd(15)}${description}`
        )
    },
    about: {
        description: 'About me',
        execute: () => [
            'Full Stack Developer',
            'Specializing in:',
            '- API Development',
            '- Backend Architecture',
            '- Database Optimization',
            '',
            'Type "skills" for technical skills'
        ]
    },
    skills: {
        description: 'Technical skills',
        execute: () => [
            'Languages: Node.js, Python, Go, SQL, JavaScript/TypeScript, C/C++',
            'Frameworks: Express, FastAPI, Django, Flask, Next.js',
            'Databases: PostgreSQL, MongoDB, Redis',
            'DevOps: Docker, CI/CD'
        ]
    },
    contact: {
        description: 'Contact information',
        execute: () => [
            'Email: dimitriiskyr@gmail.com',
            'GitHub: github.com/kyriakid1s',
            'LinkedIn: linkedin.com/in/dimitriskyriakidiskortsekidis',
            '',
        ]
    },
    clear: {
        description: 'Contact information',
        execute: () => 'CLEAR_TERMINAL'
    },
    sudo: {
        description: 'Admin privileges',
        execute: () => 'Permission denied: Try "contact" instead 😊'
    }
}

export default function AppTerminal() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<TerminalOutput[]>([
        { text: 'Welcome to my developer terminal!', isCommand: false },
        { text: 'Type "help" to begin', isCommand: false },
        { text: 'Press Tab to auto complete commands', isCommand: false }
    ])
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isFocused, setIsFocused] = useState(false)
    const terminalContentRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-scroll and focus
    useEffect(() => {
        if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight
        }
        if (isFocused) inputRef.current?.focus()
    }, [output, isFocused])

    // Command suggestions
    useEffect(() => {
        if (!input) {
            setSuggestions([])
            return
        }
        const matches = Object.keys(commands).filter(cmd =>
            cmd.startsWith(input.toLowerCase())
        )
        setSuggestions(matches)
    }, [input])

    const executeCommand = (cmd: string) => {
        const [baseCommand, ...args] = cmd.split(' ')
        const command = baseCommand.toLowerCase()

        if (!command) return

        setOutput(prev => [...prev, { text: `$ ${cmd}`, isCommand: true }])

        if (command in commands) {
            const result = commands[command].execute(args)

            if (result === 'CLEAR_TERMINAL') {
                setOutput([])
            } else {
                setOutput(prev => [...prev, {
                    text: result,
                    isCommand: false
                }])
            }
        } else {
            setOutput(prev => [...prev, {
                text: [
                    `Command not found: ${command}`,
                    'Type "help" for available commands'
                ],
                isCommand: false,
                isError: true
            }])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        executeCommand(input)
        setInput('')
        setSuggestions([])
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab'  && suggestions.length > 0) {
            e.preventDefault()
            setInput(suggestions[0])
        } else if (e.key === 'ArrowUp' && input === '') {
            e.preventDefault()
            const lastCommand = [...output]
                .reverse()
                .find(line => line.isCommand && typeof line.text === 'string')
            if (lastCommand) {
                setInput((lastCommand.text as string).replace('$ ', ''))
            }
        }
    }

    const [close, setClose] = useState(false)
    const [fullscreen, setFullscreen] = useState(false)


    const content = (
        <div className={`flex flex-col  bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl ${close ? "opacity-0 z-[-2]" : " "} ${fullscreen ? 'fixed top-0 left-0 w-screen z-50 h-screen p-4 bg-transparent': "w-full h-[500px] max-w-3xl"} `}>
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <FiTerminal className="text-green-400" />
                    <span className="text-sm font-mono text-gray-300">terminal</span>
                </div>
                <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-200">
                        <FiMaximize2 size={16} onClick={()=>{setFullscreen(!fullscreen)}} />
                    </button>
                    <button className="text-gray-400 hover:text-red-400">
                        <FiX size={16} onClick={()=>setClose(!close)}/>
                    </button>
                </div>
            </div>

            {/* Terminal content - Fixed height with scroll */}
            <div
                ref={terminalContentRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm text-gray-100 bg-gray-900/90"
                style={{ height: '400px' }} // Fixed height for content area
                onClick={() => inputRef.current?.focus()}
            >
                {output.map((line, i) => (
                    <div key={i} className={`mb-3 ${line.isError ? 'text-red-400' : line.isCommand ? 'text-green-400' : 'text-gray-300'}`}>
                        {Array.isArray(line.text) ? (
                            line.text.map((text, j) => <div key={j}>{text}</div>)
                        ) : (
                            <div>{line.text}</div>
                        )}
                    </div>
                ))}

                {/* Input line */}
                <form onSubmit={handleSubmit} className="flex items-start bottom-0 bg-gray-900/90 pt-2">
                    <span className="text-green-400 mr-2 ">$</span>
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-transparent  border-none outline-none text-white caret-green-400"
                            autoFocus
                            spellCheck="false"
                        />
                        {suggestions.length > 0 && (
                            <div className="absolute bottom-full mb-1 left-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                {suggestions.map((suggestion, i) => (
                                    <div
                                        key={suggestion}
                                        className={`px-3 py-1 cursor-pointer ${i === 0 ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                        onClick={() => {
                                            setInput(suggestion)
                                            inputRef.current?.focus()
                                        }}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Status bar */}
            <div className="px-3 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 font-mono">
                <div className="flex justify-between">
                    <span>{output.length} lines</span>
                    <span>UTF-8</span>
                    <span>zsh</span>
                </div>
            </div>
        </div>
    )
      return fullscreen ? createPortal(content, document.body) : content;
}