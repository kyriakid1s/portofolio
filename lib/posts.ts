import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
    contentHtml: string;
    [key: string]: any;
}

export interface BlogPostListItem extends Omit<BlogPost, 'contentHtml'> { }

function getPostFilePath(id: string): string {
    const filePath = path.join(postsDirectory, `${id}.md`);

    // Verify the file exists
    if (!fs.existsSync(filePath)) {
        throw new Error(`Post file not found: ${filePath}`);
    }

    return filePath;
}

const postsDirectory = path.join(process.cwd(), 'content');

export function getSortedPostsData(): BlogPostListItem[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName): BlogPostListItem => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt || '',
            ...matterResult.data
        };
    });

    return allPostsData.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
}
export function getPostMetadata(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post file not found: ${fullPath}`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return matter(fileContents).data;
}

export async function getPostData(id: string): Promise<BlogPost> {
    try {
        const fullPath = getPostFilePath(id);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
            id,
            contentHtml,
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt || '',
            ...matterResult.data
        };
    } catch (error) {
        console.error(`Error loading post ${id}:`, error);
        throw error; // This will trigger the notFound() in the page
    }
}

export function getAllPostIds(): { id: string }[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            id: fileName.replace(/\.md$/, ''),
        };
    });
}