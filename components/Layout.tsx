import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title ? `${title} | My Blog` : 'My Blog'}</title>
                <meta name="description" content="My personal blog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </>
    );
}