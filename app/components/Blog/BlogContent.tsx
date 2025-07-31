'use client';

import { useEffect, useState } from 'react';
import hljs from 'highlight.js';

interface BlogContentProps {
    contentHtml: string;
}

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

export default function BlogContent({ contentHtml }: BlogContentProps) {
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        // Add IDs to headings after the content is rendered
        const addHeadingIds = () => {
            const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6');

            headings.forEach((heading, index) => {
                if (!heading.id) {
                    const text = heading.textContent || '';
                    const slug = generateSlug(text) || `heading-${index}`;
                    heading.id = slug;
                }
            });
        };

        // Highlight all code blocks after the content is rendered
        hljs.highlightAll();

        // Add heading IDs
        addHeadingIds();

        // Reading progress indicator
        const updateReadingProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setReadingProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', updateReadingProgress);

        // Initial progress calculation
        updateReadingProgress();

        return () => window.removeEventListener('scroll', updateReadingProgress);
    }, [contentHtml]);

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <div className="prose prose-lg prose-invert max-w-none blog-content prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-code:text-yellow-400 prose-pre:bg-gray-900 prose-blockquote:border-green-500">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
        </>
    );
}
