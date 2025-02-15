/* eslint-disable @typescript-eslint/no-base-to-string */
"use client";

import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import remarkGfm from "remark-gfm";

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
      className={`prose dark:prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 text-3xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 text-2xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-xl font-bold">{children}</h3>
        ),

        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),

        ul: ({ children }) => (
          <ul className="mb-4 list-disc pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal pl-6">{children}</ol>
        ),

        p: ({ children }) => <p className="mb-4">{children}</p>,

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
      }}
    >
      {content}
    </ReactMarkdown>
  );
}