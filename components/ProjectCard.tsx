import Link from 'next/link'

export default function ProjectCard({ project }: {
    project: {
        title: string
        description: string
        technologies: string[]
        githubUrl: string
        liveUrl: string
    }
}) {
    return (
        <div className="bg-code-bg p-6 rounded-lg border border-terminal-green/20 hover:border-terminal-green/50 transition">
            <h3 className="text-xl font-bold mb-2 text-terminal-green">{project.title}</h3>
            <div className="mb-4">{project.description}</div>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                    <span key={tech} className="bg-terminal-green/10 text-terminal-green px-2 py-1 text-xs rounded">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex space-x-3">
                <Link href={project.githubUrl} target='_blank' className="text-terminal-green hover:underline">
                    View Code
                </Link>
                {project.liveUrl && (
                    <Link href={project.liveUrl} className="text-terminal-green hover:underline">
                        Live Demo
                    </Link>
                )}
            </div>
        </div>
    )
}