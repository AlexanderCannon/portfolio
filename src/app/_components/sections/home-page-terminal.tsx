"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import EmailCaptureForm from '~/app/_components/forms/email-capture-form';
import SnakeGame from '~/app/_components/games/snake-game';

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

  // Snake game instance
  const snakeGame = SnakeGame({
    onGameUpdate: (gameDisplay) => {
      setHistory(prev => {
        // Remove previous game display lines
        const filtered = prev.filter(entry =>
          !entry.content.includes('🐍 Snake Game') &&
          !entry.content.includes('Use WASD') &&
          !entry.content.includes('┌') &&
          !entry.content.includes('│') &&
          !entry.content.includes('└') &&
          !entry.content.includes('Game Active') &&
          !entry.content.includes('Game Over')
        );

        // Add new game display
        const newEntries = gameDisplay.map(line => ({
          type: 'output' as const,
          content: line,
          className: 'text-green-400'
        }));

        return [...filtered, ...newEntries];
      });
    }
  });


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
      '  resume     - Display resume information',
      '  more       - Show additional fun commands',
      '  quit       - Quit active snake game'
    ],

    more: () => [
      '🎮 Fun Commands:',
      '  matrix     - Enter the Matrix',
      '  snake      - Play Snake game',
      '  fortune    - Get a random fortune',
      '  cowsay     - Make a cow say something',
      '  figlet     - ASCII art text',
      '  neofetch   - System information',
      '  weather    - Check the weather',
      '  joke       - Tell a programming joke',
      '  coffee     - Check coffee status',
      '  motivation - Get daily motivation',
      '',
      '💡 Pro tip: These commands are perfect for:',
      '  - Breaking the ice in interviews',
      '  - Impressing colleagues',
      '  - Having fun while coding',
      '  - Getting daily motivation',
      '',
      'Try: fortune, joke, or coffee for a quick pick-me-up! ☕'
    ],

    whoami: () => [
      'Alexander Cannon',
      'CTO @ Zinguist | Engineering Leader & Technology Innovator',
      'Beverly Hills, CA | alexander@farpointlabs.com',
      'Currently building AI/LLM products and leading engineering teams...'
    ],

    skills: () => [
      'Technical Skills:',
      '→ Programming: Python, TypeScript, JavaScript, Rust, Golang, C/C++',
      '→ Frameworks: React, React Native, Next.js, Node.js, Django, Flutter',
      '→ Cloud: AWS, Azure, Google Cloud Platform',
      '→ Databases: PostgreSQL, MongoDB, DynamoDB, Redis, Elasticsearch',
      '→ DevOps: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions',
      '→ AI/ML: OpenAI API, LangChain, PyTorch, TensorFlow, scikit-learn',
      '→ Blockchain: Ethereum, Solidity, Web3.js, Smart Contracts',
      '→ Leadership: Team Management, Performance Management, Technical Architecture'
    ],

    projects: () => [
      'Featured Projects:',
      '',
      '🏦 Banking & Fintech (Winston App)',
      '   - Obtained banking license and launched regulated fintech app',
      '   - Built with Golang, Kafka, Kubernetes, React Native',
      '',
      '🎥 Video Streaming Platform (Discovery Network)',
      '   - First online streaming platform for Discovery Network',
      '   - Supported live Olympic events for millions of viewers',
      '   - Built with React, DynamoDB, Elasticsearch, Redis',
      '',
      '💰 Blockchain & Crypto (Mishcon De Reya)',
      '   - Created and launched 3 new crypto tokens and ICOs',
      '   - Led 30-person engineering team',
      '   - Technologies: React, Flutter, AWS, Blockchain',
      '',
      '🤖 AI/LLM Solutions (Kellog, Brown & Root)',
      '   - Leading AI tool development for enterprise capabilities',
      '   - OpenAI, Azure, Python, TensorFlow, PyTorch',
      '',
      '📊 Data Science Platform (Lloyds Banking)',
      '   - Loan platform processing £360M annually',
      '   - Python, React, Node.js, TypeScript'
    ],

    experience: () => [
      'Work Experience:',
      '',
      '🎯 Current: CTO @ Zinguist (Nov 2023 - Present)',
      '   - Leading AI/LLM product development',
      '   - Automated workflows, improving efficiency by 30%',
      '   - Scaled infrastructure for 200% user growth',
      '',
      '🏢 Kellog, Brown & Root - Engineering Manager (Dec 2023 - Feb 2025)',
      '   - Leading AI tool development for enterprise capabilities',
      '   - Managing team of engineers on AI/ML solutions',
      '   - OpenAI, Azure, Python, TensorFlow, PyTorch',
      '',
      '⚖️ Mishcon De Reya - Head of Engineering (April 2022 - Nov 2023)',
      '   - Led 30-person engineering team',
      '   - Created and launched 3 crypto tokens and ICOs',
      '   - Delivered 10+ high-impact projects',
      '',
      '🏦 Winston App - Founder & CEO (Jan 2020 - April 2022)',
      '   - Obtained banking license, launched regulated fintech app',
      '   - Golang, Kafka, Kubernetes, React Native',
      '',
      '🏆 Key Achievements:',
      '   - Built systems serving millions of users',
      '   - Led teams of 30+ engineers',
      '   - Processed £360M annually at Lloyds Banking'
    ],

    contact: () => [
      'Contact Information:',
      '📧 Email: alexander@farpointlabs.com',
      '📱 Phone: +1 840 233 2754',
      '📍 Location: Beverly Hills, CA 90210',
      '🐙 GitHub: github.com/alexandercannon',
      '💼 LinkedIn: linkedin.com/in/alexandercannon',
      '🌐 Website: farpointlabs.com',
      '',
      'Available for consulting, speaking, and collaboration opportunities!'
    ],

    about: () => [
      'About Alexander:',
      '',
      'Engineering leader with 10+ years experience building video streaming',
      'platforms, blockchain technologies, and AI/ML solutions. Expert in',
      'TypeScript, Rust, and Python with strong communication skills.',
      '',
      'Philosophy: "The best code is the code you don\'t have to write."',
      'Focus: Building systems that scale and teams that thrive.',
      '',
      'Interests: AI/ML, Cloud Architecture, Blockchain,',
      'Team Leadership, and Continuous Learning.'
    ],

    resume: () => [
      'Resume Highlights:',
      '',
      '💼 Experience:',
      '   - 10+ years in software development',
      '   - 5+ years in leadership roles',
      '   - Led teams of 30+ engineers',
      '   - Built systems serving millions of users',
      '',
      '🏆 Key Achievements:',
      '   - Obtained banking license (Winston App)',
      '   - Created 3 crypto tokens and ICOs',
      '   - Processed £360M annually (Lloyds Banking)',
      '   - Supported Olympic events for millions of viewers',
      '',
      '🚀 Current Focus:',
      '   - Leading product development at Zinguist',
      '   - Building enterprise AI solutions',
      '   - Scaling engineering teams and infrastructure'
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
      'System has been running optimally since 2009',
      'Current status: Leading AI/LLM development at Zinguist',
      'Coffee level: Maximum',
      'Motivation: Infinite',
      'Experience: 10+ years in software development',
      'Leadership: 5+ years managing engineering teams'
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
    },

    // 🎮 Fun Commands
    matrix: () => [
      'Wake up, Alexander...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      '',
      '01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100',
      '',
      'Reality is just a simulation.',
      'Your code is the only truth.',
      '',
      'System Status:',
      '  - Neural networks: Online',
      '  - Quantum processors: Active',
      '  - Reality.exe: Running',
      '  - Coffee.dll: Critical'
    ],

    snake: () => {
      // Start the snake game
      snakeGame.startGame();

      return [
        '🐍 Snake Game Starting...',
        '',
        'Use WASD or arrow keys to control the snake.',
        'Eat the food (🍎) to grow longer!',
        'Don\'t hit the walls or yourself.',
        '',
        'Game Controls:',
        '  W/↑ - Move up',
        '  S/↓ - Move down',
        '  A/← - Move left',
        '  D/→ - Move right',
        '  ESC - Quit game',
        '',
        'High Score: 42 (set by Alexander)',
        '',
        'Game is now active! Use WASD to move!'
      ];
    },

    fortune: () => {
      const fortunes = [
        'You will write bug-free code today.',
        'A great opportunity in AI/ML awaits you.',
        'Your next commit will be legendary.',
        'The coffee gods smile upon you.',
        'Your code will compile on the first try.',
        'A senior developer will praise your work.',
        'Your tests will all pass.',
        'You will discover a new framework.',
        'Your deployment will be successful.',
        'The terminal is your friend.',
        'You will solve a complex algorithm.',
        'Your code will be featured in a blog post.',
        'A recruiter will contact you about an amazing opportunity.',
        'Your side project will gain traction.',
        'You will learn something new today.'
      ];
      return [fortunes[Math.floor(Math.random() * fortunes.length)] ?? 'You will write amazing code today!'];
    },

    cowsay: (args?: string[]) => {
      const message = args?.join(' ') ?? 'Hello from the terminal!';
      return [
        ` ________________________`,
        `< ${message} >`,
        ` ------------------------`,
        `        \\   ^__^`,
        `         \\  (oo)\\_______`,
        `            (__)\\       )\\/\\`,
        `                ||----w |`,
        `                ||     ||`,
        '',
        'The cow says: "Moo-ve fast and break things!"'
      ];
    },

    figlet: (args?: string[]) => {
      const text = args?.join(' ') ?? 'ALEXANDER';
      return [
        'ASCII Art Generator:',
        '',
        '┌─────────────────────────────────────┐',
        '│  ╔═══════════════════════════════╗  │',
        '│  ║                               ║  │',
        '│  ║    ' + text.toUpperCase() + '    ║  │',
        '│  ║                               ║  │',
        '│  ╚═══════════════════════════════╝  │',
        '└─────────────────────────────────────┘',
        '',
        'Try: figlet "YOUR TEXT HERE"'
      ];
    },

    neofetch: () => [
      '╭─────────────────────────────────────────╮',
      '│  Alexander@Portfolio                    │',
      '├─────────────────────────────────────────┤',
      '│  OS: macOS 14.6.0 (Darwin)             │',
      '│  Kernel: 24.6.0                        │',
      '│  Shell: /bin/zsh                       │',
      '│  Terminal: Cursor Terminal              │',
      '│  CPU: Apple Silicon M2                 │',
      '│  Memory: 16GB LPDDR5                   │',
      '│  Storage: 512GB SSD                    │',
      '│  Uptime: 10+ years (since 2009)        │',
      '│  Packages: ∞ (always learning)         │',
      '│  Languages: TypeScript, Python, Rust   │',
      '│  Editor: Cursor (AI-powered)           │',
      '│  Theme: Terminal Vibes                 │',
      '│  Coffee: ☕☕☕☕☕ (Maximum)            │',
      '│  Status: Building the future            │',
      '╰─────────────────────────────────────────╯'
    ],

    weather: () => [
      '🌤️  Weather Report',
      '',
      'Location: Beverly Hills, CA',
      'Temperature: 72°F (22°C)',
      'Condition: Perfect for coding',
      'Humidity: 45%',
      'Wind: 5 mph',
      'UV Index: Moderate',
      '',
      'Forecast:',
      '  Today: Sunny with a chance of bugs',
      '  Tomorrow: Cloudy with a chance of deployment',
      '  Weekend: Clear skies for side projects',
      '',
      'Programming Weather:',
      '  Code Quality: Excellent',
      '  Bug Density: Low',
      '  Coffee Level: Critical',
      'Motivation: High',
      '',
      'Perfect weather for building amazing things! ☀️'
    ],

    joke: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs!',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
        'Why did the programmer quit his job? He didn\'t get arrays.',
        'What do you call a programmer from Finland? Nerdic.',
        'Why do Java developers wear glasses? Because they can\'t C#.',
        'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"',
        'Why did the developer go broke? Because he used up all his cache.',
        'What\'s a programmer\'s favorite hangout place? The Foo Bar.',
        'Why do programmers hate nature? It has too many bugs.',
        'How do you comfort a JavaScript bug? You console it.',
        'What do you call a programmer who doesn\'t comment their code? A silent partner.',
        'Why did the programmer get stuck in the shower? The instructions on the shampoo bottle said: Lather, Rinse, Repeat.',
        'What\'s the object-oriented way to become wealthy? Inheritance.',
        'Why do programmers prefer iOS development? Because Android has too many fragments.',
        'What do you call a programmer from the future? A time-traveler.'
      ];
      return [jokes[Math.floor(Math.random() * jokes.length)] ?? 'Why do programmers prefer dark mode? Because light attracts bugs!'];
    },

    coffee: () => [
      '☕ Coffee Status Report',
      '',
      'Current Level: MAXIMUM',
      'Quality: Premium',
      'Type: Dark Roast',
      'Temperature: Perfect',
      'Caffeine Content: Critical',
      '',
      'Coffee Metrics:',
      '  - Cups consumed today: 8',
      '  - Productivity boost: +300%',
      '  - Bug-fixing power: Enhanced',
      '  - Code quality: Improved',
      '  - Debugging skills: Supercharged',
      '',
      'Coffee Philosophy:',
      '  "Code without coffee is like a car without fuel."',
      '  "The best code is written between sips."',
      '  "Coffee is the fuel of innovation."',
      '',
      'Status: Ready to build amazing things! 🚀'
    ],

    motivation: () => {
      const motivations = [
        'Every expert was once a beginner. Every pro was once an amateur.',
        'The only way to do great work is to love what you do.',
        'Code is like humor. When you have to explain it, it\'s bad.',
        'First, solve the problem. Then, write the code.',
        'The best error message is the one that never shows up.',
        'Code never lies, comments sometimes do.',
        'Make it work, make it right, make it fast.',
        'The best code is the code you don\'t have to write.',
        'Programming is not about typing, it\'s about thinking.',
        'Clean code always looks like it was written by someone who cares.',
        'The only way to go fast is to go well.',
        'Code is poetry that machines can understand.',
        'The best way to get a project done faster is to start sooner.',
        'Simplicity is the ultimate sophistication.',
        'The best code is written with intention, not by accident.'
      ];
      return [
        '💪 Daily Motivation',
        '',
        motivations[Math.floor(Math.random() * motivations.length)] ?? 'Every expert was once a beginner.',
        '',
        'Remember: You\'re building the future, one commit at a time! 🚀'
      ];
    },

    quit: () => {
      if (snakeGame.isGameActive()) {
        snakeGame.stopGame();
        return ['Snake game stopped. Thanks for playing!'];
      }
      return ['No active game to quit.'];
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
