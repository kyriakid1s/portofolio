'use client'
import { useEffect, useState } from 'react'

export default function TerminalWindow({
    commands = [],
    startDelay = 0,
    windowClass = ''
}) {
    const [displayedCommands, setDisplayedCommands] = useState([])
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [showWindow, setShowWindow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowWindow(true), startDelay)
        return () => clearTimeout(timer)
    }, [startDelay])

    useEffect(() => {
        if (!showWindow || currentCommandIndex >= commands.length) {
            setIsTyping(false)
            return
        }

        const currentCommand = commands[currentCommandIndex]
        let charIndex = 0

        const typingInterval = setInterval(() => {
            if (charIndex <= currentCommand.command.length) {
                setDisplayedCommands(prev => {
                    const newCommands = [...prev]
                    if (!newCommands[currentCommandIndex]) {
                        newCommands[currentCommandIndex] = {
                            command: currentCommand.command.substring(0, charIndex),
                            response: '',
                            showResponse: false
                        }
                    } else {
                        newCommands[currentCommandIndex].command = currentCommand.command.substring(0, charIndex)
                    }
                    return newCommands
                })
                charIndex++
            } else {
                clearInterval(typingInterval)
                setTimeout(() => {
                    setDisplayedCommands(prev => {
                        const newCommands = [...prev]
                        newCommands[currentCommandIndex].response = currentCommand.response
                        newCommands[currentCommandIndex].showResponse = true
                        return newCommands
                    })
                    setCurrentCommandIndex(prev => prev + 1)
                }, 300)
            }
        }, Math.random() * 20 + 30)

        return () => clearInterval(typingInterval)
    }, [currentCommandIndex, commands, showWindow])

    if (!showWindow) return null

    return (
        <div className={`terminal-scroll bg-zinc-950 text-lime-300 p-4 font-mono text-sm overflow-y-auto ${windowClass}`}>
            {displayedCommands.map((cmd, idx) => (
                <div key={idx} className="mb-3">
                    <div className="whitespace-pre-wrap">
                        <span className="text-green-400">$</span> {cmd.command}
                    </div>
                    {cmd.showResponse && (
                        <div
                            className="text-zinc-300 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: cmd.response }}
                        />
                    )}
                </div>
            ))}
            {isTyping && (
                <span className="inline-block w-2 h-5 bg-green-400 animate-cursor-blink" />
            )}
        </div>
    )
}
