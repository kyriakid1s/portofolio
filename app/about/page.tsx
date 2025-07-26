import CodeBlock from '@/components/CodeBlock'

export default function About() {
    const skills = [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 95 },
        { name: 'SQL/NoSQL', level: 90 },
        { name: 'Go', level: 85 },
        { name: 'Java', level: 70 },
    ]

    const experience = [
        {
            role: 'Techinian',
            company: 'Hellenic Air Force',
            period: '2017 - Present',
            description: 'Maintenance of anti-air missile systems.'
        },

    ]

    return (
        <div className="space-y-12 max-w-full mx-auto">
            <section>
                <h1 className="text-3xl font-bold mb-6">About Me</h1>
                <div className="grid md:grid-cols-2 gap-8 text-pretty">
                    <div>
                        <p className="mb-4">
                            I'm a passionate backend developer with 5+ years of experience building
                            high-performance, scalable web applications and distributed systems.
                        </p>
                        <p className="mb-4">
                            My expertise lies in designing efficient APIs, optimizing database
                            performance, implementing robust authentication systems, and cloud infrastructure.
                        </p>
                        <p className="mb-6">
                            I specialize in taking complex technical challenges and breaking them down
                            into elegant, maintainable solutions that scale with business needs.
                        </p>
                    </div>

                    <div>
                        <CodeBlock
                            language="javascript"
                            code={`// My Development Principles
async function developWithQuality() {
  // 1. Write clean, maintainable code
  const code = await writeCleanCode(requirements);
  
  // 2. Implement thorough testing
  await implementTests(code);
  
  // 3. Optimize for performance
  const optimized = await optimizePerformance(code);
  
  // 4. Ensure security best practices
  const secure = await applySecurity(optimized);
  
  // 5. Document thoroughly
  return documentSystem(secure);
}`}
                        />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div style={{ width: `${skill.level}%` }} className=" bg-gray-700 rounded-full h-2.5" >
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-code-bg p-6 rounded-lg border border-terminal-green/20">
                        <h3 className="text-xl font-bold mb-4 text-terminal-green">Technical Stack</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Languages</h4>
                                <ul className="space-y-1">
                                    <li>JavaScript/TypeScript</li>
                                    <li>Python</li>
                                    <li>Go</li>
                                    <li>Java</li>
                                    <li>C/C++</li>
                                    <li>SQL</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Frameworks</h4>
                                <ul className="space-y-1">
                                    <li>Node.js/Express</li>
                                    <li>FastAPI/Django</li>
                                    <li>Raect</li>
                                    <li>Vue</li>
                                    <li>Next.js</li>
                                    <li>GraphQL</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Databases</h4>
                                <ul className="space-y-1">
                                    <li>PostgreSQL</li>
                                    <li>MongoDB</li>
                                    <li>Redis</li>
                                    <li>Elasticsearch</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">DevOps</h4>
                                <ul className="space-y-1">
                                    <li>Docker</li>
                                    <li>CI/CD Pipelines</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section>
                <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
                <div className="space-y-6">
                    {experience.map((exp, index) => (
                        <div key={index} className="bg-code-bg p-6 rounded-lg border border-terminal-green/20">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold">{exp.role}</h3>
                                <span className="text-terminal-green">{exp.period}</span>
                            </div>
                            <h4 className="text-lg mb-3">{exp.company}</h4>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div >
    )
}