"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import EmailCaptureForm from '~/app/_components/forms/email-capture-form';

// Type definitions
interface HistoryEntry {
  type: 'command' | 'output';
  content: string;
  className?: string;
}

type CommandFunction = (args?: string[]) => string[] | string;

const ALEXANDER_ASCII_ART = `     █████╗ ██╗     ███████╗██╗  ██╗ █████╗ ███╗   ██╗██████╗ ███████╗██████╗ 
    ██╔══██╗██║     ██╔════╝╚██╗██╔╝██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
    ███████║██║     █████╗   ╚███╔╝ ███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    ██╔══██║██║     ██╔══╝   ██╔██╗ ██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    ██║  ██║███████╗███████╗██╔╝ ██╗██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║
    ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝`;

const HomePageTerminal = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: 'output', content: ALEXANDER_ASCII_ART, className: 'text-center'
    },
    { type: 'output', content: 'Welcome to Alexander Cannon\'s terminal! Type "help" for available commands.', className: 'text-muted-foreground' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, CommandFunction> = {
    help: () => [
      'Available commands:',
      '  help       - Show this help message',
      '  whoami     - Display user information',
      '  skills     - List technical skills',
      '  projects   - Show project portfolio',
      '  experience - Display work experience',
      '  contact    - Display contact information',
      '  clear      - Clear the terminal',
      '  date       - Show current date',
      '  uptime     - Show system uptime',
      '  ls         - List directory contents',
      '  cat <file> - Display file contents',
      '  about      - Show detailed about information',
      '  resume     - Display resume information'
    ],

    whoami: () => [
      'Alexander Cannon',
      'Engineering Leader & Technology Innovator',
      'Currently building the future, one line of code at a time...'
    ],

    skills: () => [
      'Technical Skills:',
      '→ TypeScript/JavaScript (Expert)',
      '→ Python (Advanced)',
      '→ Rust (Intermediate)',
      '→ React/Next.js (Expert)',
      '→ AWS Cloud Architecture (Expert)',
      '→ AI/ML & LLM Integration (Advanced)',
      '→ System Design & Microservices (Expert)',
      '→ Database Design & Optimization (Advanced)',
      '→ DevOps & CI/CD (Advanced)',
      '→ Leadership & Team Management (Expert)'
    ],

    projects: () => [
      'Featured Projects:',
      '',
      '🚀 Enterprise SaaS Platforms',
      '   - Scaled to 1M+ users with 99.99% uptime',
      '   - Built with React, TypeScript, AWS',
      '',
      '🤖 AI/ML Solutions',
      '   - LLM-based productivity tools',
      '   - Custom AI models for enterprise use',
      '',
      '☁️ Cloud Infrastructure',
      '   - Multi-region deployments',
      '   - Auto-scaling microservices',
      '',
      '📱 Full-Stack Applications',
      '   - Modern web applications',
      '   - Mobile-responsive design'
    ],

    experience: () => [
      'Work Experience:',
      '',
      '🎯 Current: CTO @ Zinguist',
      '   - Leading AI/LLM product development',
      '   - Managing engineering teams',
      '   - Strategic technology decisions',
      '',
      '💼 Previous: Senior Engineering Roles',
      '   - Full-stack development',
      '   - Cloud architecture design',
      '   - Team leadership & mentoring',
      '',
      '🏆 Achievements:',
      '   - Built systems serving 1M+ users',
      '   - Led teams of 10+ engineers',
      '   - Delivered 99.99% uptime systems'
    ],

    contact: () => [
      'Contact Information:',
      '📧 Email: alexander@farpointlabs.com',
      '🐙 GitHub: github.com/alexandercannon',
      '💼 LinkedIn: linkedin.com/in/alexandercannon',
      '🌐 Website: farpointlabs.com',
      '',
      'Available for consulting, speaking, and collaboration opportunities!'
    ],

    about: () => [
      'About Alexander:',
      '',
      'A passionate engineering leader who believes in the power of',
      'clean code, scalable architecture, and innovative technology.',
      'When not coding, probably thinking about the next big thing.',
      '',
      'Philosophy: "The best code is the code you don\'t have to write."',
      'Focus: Building systems that scale and teams that thrive.',
      '',
      'Interests: AI/ML, Cloud Architecture, Open Source,',
      'Team Building, and Continuous Learning.'
    ],

    resume: () => [
      'Resume Highlights:',
      '',
      '🎓 Education:',
      '   - Computer Science & Engineering',
      '   - Continuous learning in AI/ML',
      '',
      '💼 Experience:',
      '   - 10+ years in software development',
      '   - 5+ years in leadership roles',
      '   - Proven track record of scaling systems',
      '',
      '🏆 Certifications:',
      '   - AWS Solutions Architect',
      '   - Google Cloud Professional',
      '   - Various AI/ML certifications'
    ],

    ls: () => [
      'total 42',
      'drwxr-xr-x  projects/',
      'drwxr-xr-x  skills/',
      'drwxr-xr-x  experience/',
      '-rw-r--r--  about.txt',
      '-rw-r--r--  contact.txt',
      '-rw-r--r--  resume.md',
      '-rwxr-xr-x  deploy.sh'
    ],

    date: () => [new Date().toString()],

    uptime: () => [
      'System has been running optimally since 2014',
      'Current status: Building amazing products',
      'Coffee level: Maximum',
      'Motivation: Infinite'
    ],

    clear: () => 'CLEAR',

    cat: (args?: string[]) => {
      const file = args?.[0];
      const files: Record<string, string[]> = {
        'about.txt': (commands.about?.() ?? []) as string[],
        'contact.txt': (commands.contact?.() ?? []) as string[],
        'resume.md': [
          '# Alexander Cannon - Resume',
          '',
          '## Current Role',
          '**CTO @ Zinguist** - Leading AI/LLM product development',
          '',
          '## Key Skills',
          '- Full-Stack Development (TypeScript, Python, React)',
          '- Cloud Architecture (AWS, Azure, GCP)',
          '- AI/ML & LLM Integration',
          '- Team Leadership & Management',
          '',
          '## Notable Achievements',
          '- Built systems serving 1M+ users',
          '- Led engineering teams of 10+ developers',
          '- Achieved 99.99% system uptime',
          '- Delivered multiple successful product launches'
        ]
      };

      if (!file) {
        return ['cat: missing file operand', 'Try \'cat <filename>\''];
      }

      if (files[file]) {
        return files[file];
      }

      return [`cat: ${file}: No such file or directory`];
    }
  };

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const [command, ...args] = trimmedInput.split(' ');
    const lowerCommand = command?.toLowerCase() ?? '';

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `alexander@terminal:~$ ${trimmedInput}` }]);

    if (commands[lowerCommand]) {
      const result = commands[lowerCommand](args);

      if (result === 'CLEAR') {
        setHistory([
          {
            type: 'output', content: ALEXANDER_ASCII_ART, className: 'text-center'
          }
        ]);
      } else {
        const resultArray = Array.isArray(result) ? result : [result];
        resultArray.forEach((line: string) => {
          setHistory(prev => [...prev, { type: 'output', content: line, className: 'text-muted-foreground' }]);
        });
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'output',
        content: `Command '${command}' not found. Type 'help' for available commands.`,
        className: 'text-muted-foreground'
      }]);
    }

    // Update command history
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] ?? '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Header */}
        <div className="border border-border rounded-t-lg bg-card p-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-muted-foreground">Terminal — alexander@terminal:~</span>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="border-l border-r border-b border-border rounded-b-lg bg-card p-6 min-h-[600px] max-h-[600px] overflow-y-auto cursor-text"
          onClick={handleTerminalClick}
        >
          <div className="space-y-1 text-sm">
            {/* Command History */}
            {history.map((entry, index) => (
              <div key={index} className={entry.className ?? ''}>
                {entry.type === 'command' ? (
                  <div className="text-primary font-bold">{entry.content}</div>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono">{entry.content}</pre>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center">
              <span className="text-primary font-bold">alexander@terminal:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
                style={{ caretColor: 'currentColor' }}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <EmailCaptureForm />
        </div>

        {/* Contact Icons */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6">
            <a href="mailto:alexander@farpointlabs.com" className="hover:text-blue-400 transition-colors">
              <FaEnvelope className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaGithub className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageTerminal;
