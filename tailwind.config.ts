import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                terminal: {
                    black: '#1a1a1a',
                    green: '#00ff00',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#f3f4f6',
                        maxWidth: 'none',
                        '[class~="lead"]': {
                            color: '#d1d5db',
                        },
                        a: {
                            color: '#60a5fa',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#93c5fd',
                            },
                        },
                        strong: {
                            color: '#f9fafb',
                            fontWeight: '600',
                        },
                        'ol > li::marker': {
                            color: '#60a5fa',
                        },
                        'ul > li::marker': {
                            color: '#00ff00',
                        },
                        hr: {
                            borderColor: '#374151',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        },
                        blockquote: {
                            color: '#d1d5db',
                            borderLeftWidth: '4px',
                            borderLeftColor: '#00ff00',
                            backgroundColor: 'rgba(31, 41, 55, 0.5)',
                            paddingLeft: '1.5rem',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            borderRadius: '0 0.5rem 0.5rem 0',
                            fontStyle: 'italic',
                        },
                        h1: {
                            color: '#f9fafb',
                            fontWeight: '700',
                        },
                        h2: {
                            color: '#f9fafb',
                            fontWeight: '600',
                            borderBottomWidth: '1px',
                            borderBottomColor: '#4b5563',
                            paddingBottom: '0.5rem',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        },
                        h3: {
                            color: '#f9fafb',
                            fontWeight: '600',
                        },
                        h4: {
                            color: '#f9fafb',
                            fontWeight: '600',
                        },
                        'figure figcaption': {
                            color: '#9ca3af',
                        },
                        code: {
                            color: '#fbbf24',
                            backgroundColor: 'rgba(31, 41, 55, 0.8)',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            paddingTop: '0.25rem',
                            paddingBottom: '0.25rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            border: '1px solid rgba(75, 85, 99, 0.5)',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        pre: {
                            backgroundColor: '#111827',
                            color: '#f3f4f6',
                            borderRadius: '0.5rem',
                            border: '1px solid #4b5563',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            border: 'none',
                            color: '#f3f4f6',
                        },
                        p: {
                            color: '#d1d5db',
                            lineHeight: '1.75',
                        },
                        li: {
                            color: '#d1d5db',
                        },
                        table: {
                            backgroundColor: 'rgba(31, 41, 55, 0.5)',
                            border: '1px solid #4b5563',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                        },
                        thead: {
                            backgroundColor: '#374151',
                        },
                        th: {
                            color: '#f9fafb',
                            fontWeight: '600',
                        },
                        td: {
                            borderTopWidth: '1px',
                            borderTopColor: '#4b5563',
                            color: '#d1d5db',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

export default config
