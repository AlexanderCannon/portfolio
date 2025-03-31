/* eslint-disable @typescript-eslint/no-base-to-string */
"use client";

import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import remarkGfm from "remark-gfm";
import remarkSuperscript from "remark-supersub";

// Register languages for syntax highlighting
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  // Add other props as needed
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={`prose prose-lg lg:prose-xl dark:prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm, remarkSuperscript]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-6 text-4xl lg:text-5xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-4 mt-8 text-3xl lg:text-4xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-3 mt-6 text-2xl lg:text-3xl font-bold">{children}</h3>
        ),

        p: ({ children }) => (
          <p className="mb-6 text-lg lg:text-xl">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="mb-6 list-disc pl-8 text-lg lg:text-xl">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 list-decimal pl-8 text-lg lg:text-xl">{children}</ol>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">
            {children}
          </blockquote>
        ),

        code: ({ className, children, ...props }: CodeProps) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const match = /language-(\w+)/.exec(className ?? "");
          const language = match ? match[1] : "";
          const isInline = !match;

          return isInline ? (
            <code
              className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800"
              {...props}
            >
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              language={language}
              style={materialDark}
              PreTag="div"
              className="rounded-md"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },

        sup: ({ children }) => (
          <sup className="text-sm lg:text-base relative -top-1">{children}</sup>
        ),


        table: ({ children }) => (
          <div className="mb-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-gray-50 px-4 py-2 dark:bg-gray-700">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border-t px-4 py-2">{children}</td>
        ),
        a: ({ children, href }) => (
          <a 
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}