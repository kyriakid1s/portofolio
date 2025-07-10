import TerminalWindow from '@/compoments/TerminalWindows'

export default function Home() {
  const terminals = [
    {
      id: 1,
      commands: [
        { command: '➜ ~ whoami', response: 'Dimitris Kyriakidis – fullstack_dev (backend_specialist)' },
        {
          command: '➜ ~ cat about_me.txt', response: ' I\'m a fullstack developer from Greece with a strong focus on backend engineering. ' +
            'I specialize in building scalable APIs, optimizing databases, and architecting reliable systems. ' +
            'Currently studying Computer Science at the Hellenic Open University, ' +
            'I started my career in the Hellenic Air Force where I graduated from the NCO Academy (2017–2020) and work as a mechanic. ' +
            'My journey from hardware to software has equipped me with a unique problem-solving mindset and discipline. ' +
            'Beyond backend development, I also enjoy creating clean and functional UIs when needed.'
        },
        {
          command: '➜ ~ pwd', response: 'Currently I\'m working at Hellenic Air Force as a mechanic. '
        },
      ],

    },
    {
      id: 2,
      commands: [
        { command: '➜ ~ cd skills/', response: '' },
        { command: 'skills ➜ cat skills.txt', response: 'React, Vue,  Node.js, Express.js, Next.js<br>Go, Python, TypeScript, Javascript, C, C++<br>Docker, AWS' },
        { command: '➜ ~ cd ..', response: '' },
        { command: '➜ ~ cd education/', response: '' },
        {
          command: 'education ➜ cat history.txt',
          response:
            '🎓 Hellenic Air Force NCO Academy (2017–2020)\n' +
            '🎓 Hellenic Open University – BSc in Computer Science (2024-current)\n' +
            '📚 Self-taught in fullstack web development and backend systems'
        }

      ],

    },
    {
      id: 3,
      commands: [
        { command: '➜ ~ ls -l projects/', response: ' drwxr-xr-x  instagram-clone\n drwxr-xr-x  file-sharing-app\n drwxr-xr-x  personal-finance\n drwxr-xr-x  chat-app\n drwxr-xr-x  portfolio\n drwxr-xr-x  task-manager' },

        {
          command: '➜ ~ cat projects/instagram-clone/README.txt',
          response:
            '📸 Instagram Clone – Built with TypeScript, Express.js, and MongoDB.\n' +
            'Implements core social features like authentication, posts, likes, and comments with a clean API-first design.'
        },
        {
          command: '➜ ~ cat projects/file-sharing-app/README.txt',
          response:
            '📁 File Sharing App – A self-hosted WeTransfer alternative developed in Go and Vue.js.\n' +
            'Enables fast, secure, and anonymous file uploads/downloads with temporary storage and shareable links.'
        },
        {
          command: '➜ ~ cat projects/personal-finance/README.txt',
          response:
            '💰 Personal Economics Management – Desktop app in Python (Tkinter + SQLite).\n' +
            'Tracks incomes, expenses, and budgets, offering insightful visualizations and monthly reports.'
        },
        {
          command: '➜ ~ cat projects/chat-app/README.txt',
          response:
            '💬 Chat App – Real-time messaging app built in Go using WebSockets.\n' +
            'Lightweight backend with user channels, message history, and concurrency-safe architecture.'
        },
      ],

    },
    {
      id: 4,
      commands: [
        { command: '➜ ~ cat contact_me.txt', response: 'Email: <a href="mailto:dimitriiskyr@gmail.com" class="text-blue-400 underline">dimitriiskyr@gmail.com</a><br>GitHub: <a href="https://github.com/kyriakid1s" target="_blank" class="text-blue-400 underline">github.com/kyriakid1s</a><br>LinkedIn: <a href="https://www.linkedin.com/in/dimitriskyriakidiskortsekidis/" target="_blank" class="text-blue-400 underline">linkedin.com/in/dimitriskyriakidiskortsekidis/</a>' },
        { command: '➜ ~ cat cv.txt', response: 'Download CV: <a href="/cv.pdf" download class="text-green-400 underline">Download CV (PDF)</a>' }
      ],

    }
  ]

  return (
    <main className="w-screen h-screen grid grid-cols-1 gap-2 md:grid-cols-2 grid-rows-2 bg-zinc-900">
      {terminals.map((terminal, index) => (
        <TerminalWindow
          key={terminal.id}
          commands={terminal.commands}
          startDelay={0}
          windowClass={`w-full h-full border-2 border border-green-700 rounded-xl shadow-lg m-2`}
        />
      ))}
    </main>
  )
}
