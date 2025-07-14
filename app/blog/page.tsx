import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogListPage() {
    const posts = getSortedPostsData();

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.id} className="border-b pb-6">
                        {/* Important: href must match [slug] structure */}
                        <Link href={`/blog/${post.id}`} className="block hover:opacity-80">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-2">{post.excerpt}</p>
                            <time className="text-sm text-gray-500">
                                {new Date(post.date).toLocaleDateString()}
                            </time>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}