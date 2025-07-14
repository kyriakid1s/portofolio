import ProjectCard from '@/components/ProjectCard'

const projects = [
    {
        title: "Distributed Task Queue",
        description: "A scalable task queue system using Redis and Node.js, processing 10k+ jobs per minute.",
        technologies: ["Node.js", "Redis", "Docker", "Kubernetes"],
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        title: "REST API Framework",
        description: "A modular framework for building REST APIs with built-in authentication and rate limiting.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "JWT"],
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        title: "Real-time Analytics Service",
        description: "High-performance analytics service processing streaming data with WebSockets.",
        technologies: ["Node.js", "WebSockets", "MongoDB", "AWS Lambda"],
        githubUrl: "#",
        liveUrl: "#"
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