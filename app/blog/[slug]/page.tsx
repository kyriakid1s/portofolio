import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds, getPostMetadata } from '@/lib/posts';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import BlogContent from '@/app/components/Blog/BlogContent';
import BackToTop from '@/app/components/Blog/BackToTop'


// Generate static params at build time
export async function generateStaticParams() {
    const posts = getAllPostIds();
    return posts.map((post) => ({
        slug: post.id, // Must match [slug] in folder name
    }));
}

// Updated metadata generation
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params
    try {
        const metadata = getPostMetadata(slug);
        return {
            title: metadata.title || 'Blog Post',
            description: metadata.excerpt || '',
        };
    } catch (error) {
        return {
            title: 'Post Not Found',
        };
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    let post;
    const { slug } = await params
    try {
        post = await getPostData(slug);
    } catch (error) {
        notFound();
    }

    return (
        <Layout title={post.title}>
            <article className="py-8">
                {/* Hero Header with Gradient Background - Narrower container */}
                <div className="max-w-4xl mx-auto px-4 mb-12">
                    <header className="relative p-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 shadow-2xl overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-800/20 pattern-dots"></div>
                        </div>

                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <time className="flex items-center text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>

                                <div className="flex items-center text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {Math.ceil(post.contentHtml.split(' ').length / 200)} min read
                                </div>
                            </div>

                            {post.excerpt && (
                                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl border-l-4 border-green-500 pl-6 italic">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>
                    </header>
                </div>

                {/* Main Content - Wider container */}
                <div className="max-w-6xl mx-auto px-4">
                    <BlogContent contentHtml={post.contentHtml} />
                </div>

                {/* Back to Blog Link */}
                <div className="max-w-4xl mx-auto px-4 mt-12 pt-8 border-t border-gray-700">
                    <a
                        href="/blog"
                        className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors duration-200 group"
                    >
                        <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Blog
                    </a>

                    {/* Back to Top Button */}
                    <BackToTop />
                </div>
            </article>
        </Layout>
    );
}