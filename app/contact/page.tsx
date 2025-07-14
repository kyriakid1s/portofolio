'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage({ text: '', isError: false })

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message')
            }

            setSubmitMessage({
                text: 'Message sent successfully!',
                isError: false
            })
            setFormData({ name: '', email: '', message: '' })

        } catch (error) {
            console.log('Error sending message:', error)
            setSubmitMessage({
                text: error instanceof Error ? error.message : 'Failed to send message',
                isError: true
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Get In Touch</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-code-bg border border-terminal-green/30 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-code-bg border border-terminal-green/30 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block mb-2">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-code-bg border border-terminal-green/30 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-terminal-green text-terminal-black px-6 py-3 rounded hover:bg-green-400 transition disabled:opacity-50"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage.text && (
                    <p className={`mt-4 ${submitMessage.isError ? 'text-red-400' : 'text-terminal-green'}`}>
                        {submitMessage.text}
                    </p>
                )}
            </form>
        </div>
    )
}