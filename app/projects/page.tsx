import ProjectCard from '@/components/ProjectCard'

const projects = [
    {
        title: "Instagram clone",
        description: (<>
            <p>A fully functional Instagram clone built with Express.js (Node), Vue.js, and MongoDB, featuring:</p>
            <ul>
                <li>-User Auth: Secure login/register with JWT & password hashing</li>
                <li>-Posts: Image uploads</li>
                <li>-Interactions: Like/comment on posts, follow/unfollow users</li>
                <li>-Real-time Chat WebSocket-powered direct messaging</li>
                <li>-Responsive UI Mobile-friendly design</li>
            </ul>
        </>),
        technologies: ["Node.js", "MongoDB", "Express", "Vue.js", "Websockets"],
        githubUrl: "https://github.com/kyriakid1s/kortsigram",
    },
    {
        title: "File Sharing",
        description:
            (<>
                <p>A fully functional file sharing app built with Go and Vue.js, featuring:</p>
                <ul>
                    <li>- End-to-end encryption: Files are encrypted before upload using AES-GCM, ensuring only authorized users can access them.</li>
                    <li>- AWS S3 storage: Scalable and reliable cloud storage for file hosting.</li>
                    <li>- Secure file links: Shareable URLs with optional expiration times for enhanced security.</li>
                </ul>
            </>),
        technologies: ["Go", "AWS S3", "Vue.js"],
        githubUrl: "https://github.com/kyriakid1s/files",
    },
    {
        title: "Real-time chat application API",
        description:
            (<>
                <p>A fast, secure, and scalable real-time chat api built with Go, designed for both group and private messaging with modern web architecture, featuring:</p>
                <ul>
                    <li>- Real-Time Messaging: Instant communication powered by WebSockets, built on Go’s high-performance concurrency model.</li>
                    <li>- Secure Authentication: Users authenticate using JWT tokens, enabling protected routes and socket connections.</li>
                    <li>- PostgreSQL Database: Stores user accounts, chat messages, and room metadata with relational integrity and performance.</li>
                </ul>
            </>),
        technologies: ["Go", "WebSockets", "Concurrent", "Postgres"],
        githubUrl: "https://github.com/kyriakid1s/chat-api",
    },
    {
        title: "Rate Limiter - Token Bucket Algorithm",
        description: (
            <>
                <p>An open source contribution in <a href="https://github.com/kashifkhan0771/utils" target="_blank" className='text-gray-400 underline hover:font-bold' >utils package</a> implementing a high-performance rate limiter using the token-bucket algorithm, built with Go for distributed systems, featuring:</p>
                <ul>
                    <li>- Token Bucket Algorithm: Efficient rate limiting with configurable burst capacity and refill rates for smooth traffic control.</li>
                    <li>- Thread-Safe Design: Concurrent operations using Go's sync package, ensuring safe access in multi-threaded environments.</li>
                    <li>- Production Ready: Comprehensive unit tests, benchmarks, and proper error handling for reliable performance in distributed systems.</li>
                </ul>
            </>
        ),
        technologies: ["Go", "Concurrency", "Algorithm Design", "Open Source"],
        githubUrl: "https://github.com/kashifkhan0771/utils/tree/main/ratelimiter",
    }
]

export default function Projects() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Projects</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    )
}