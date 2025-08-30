'use client';

import { useEffect, useState } from 'react';
import hljs from 'highlight.js';

// Configure highlight.js for better language detection
hljs.configure({
    ignoreUnescapedHTML: true,
    throwUnescapedHTML: false,
    languages: ['go', 'javascript', 'typescript', 'python', 'bash', 'json', 'yaml']
});

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

        // Highlight code blocks with better timing
        const highlightCode = () => {
            // Find all code blocks that haven't been highlighted yet
            const codeBlocks = document.querySelectorAll('.blog-content pre code:not([data-highlighted])');

            codeBlocks.forEach((block) => {
                try {
                    const codeElement = block as HTMLElement;
                    const codeText = codeElement.textContent || '';

                    // Try to detect Go language patterns if no language is specified
                    if (!codeElement.className.includes('language-') && !codeElement.className.includes('hljs')) {
                        // Check for Go-specific patterns
                        const goPatterns = [
                            /\bfunc\s+\w+\s*\(/,           // function declarations
                            /\btype\s+\w+\s+(struct|interface)/,  // type declarations
                            /\bpackage\s+\w+/,            // package declarations
                            /\bimport\s+[\"\(]/,          // import statements
                            /\bgo\s+\w+\(/,               // goroutines
                            /\bdefer\s+/,                 // defer statements
                            /\bchan\s+/,                  // channels
                            /\bselect\s*\{/,              // select statements
                            /\binterface\s*\{/,           // interface definitions
                            /fmt\.Print/,                 // common Go fmt usage
                            /\berror\s*$/m,               // error type
                            /\bnil\b/                     // nil keyword
                        ];

                        const isGoCode = goPatterns.some(pattern => pattern.test(codeText));

                        if (isGoCode) {
                            codeElement.className = 'language-go';
                            console.log('Detected Go code, set language-go class');
                        }
                    }

                    // Apply syntax highlighting
                    hljs.highlightElement(codeElement);
                    codeElement.setAttribute('data-highlighted', 'true');

                    console.log(`Highlighted code block with classes: ${codeElement.className}`);
                } catch (error) {
                    console.error('Error highlighting code block:', error);
                }
            });
        };

        // Use setTimeout to ensure DOM is fully rendered
        const timeoutId = setTimeout(() => {
            addHeadingIds();
            highlightCode();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [contentHtml]);

    return (
        <div className="prose prose-lg prose-invert max-w-none blog-content prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-code:text-yellow-400 prose-pre:bg-gray-900 prose-blockquote:border-green-500">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    );
}
