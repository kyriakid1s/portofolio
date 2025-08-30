import Terminal from '@/components/Terminal'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Hello, I'm <span className="text-terminal-green">Dimitris Kyriakidis</span>
        </h1>
        <h2 className="text-2xl mb-6">Backend Developer</h2>
        <p className="mb-8">
          I build robust, scalable server-side applications and APIs.
          Specializing in Node.js, Python, Go, databases, and cloud infrastructure.
        </p>
        <div className="flex space-x-4">
          <a href="/projects"><button className="bg-terminal-green cursor-pointer text-terminal-black px-4 py-2 rounded hover:bg-green-600 transition" >
            View Projects
          </button></a>
          <a href='/contact'><button className="border cursor-pointer border-terminal-green px-4 py-2 rounded hover:bg-gray-500 transition">
            Contact Me
          </button></a>
        </div>
      </div>
      <div className="h-auto  p-4">
        <Terminal />
      </div>
    </div>
  )
}