import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds, getPostMetadata } from '@/lib/posts';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';


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
            <article className="max-w-2xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <time className="text-gray-500 block mb-6">
                    {new Date(post.date).toLocaleDateString()}
                </time>
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </article>
        </Layout>
    );
}