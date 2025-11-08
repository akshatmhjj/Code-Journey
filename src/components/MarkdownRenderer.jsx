import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css"; // You can change the theme

export default function MarkdownRenderer({ text }) {
  if (!text || typeof text !== "string") return null;

  return (
    <div className="markdown-body text-gray-100 leading-relaxed font-inter">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-2xl font-bold text-blue-300 mt-4 mb-2 border-b border-blue-500/30 pb-1"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-xl font-semibold text-blue-400 mt-4 mb-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-lg font-semibold text-blue-300 mt-3 mb-1"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="my-3 leading-relaxed text-gray-200 text-[15px]"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside my-3 space-y-1 text-gray-200"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside my-3 space-y-1 text-gray-200"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4 text-gray-200" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            return inline ? (
              <code
                className="bg-[#1e293b] text-blue-300 px-1 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-[#0f172a] p-4 rounded-xl border border-blue-500/30 overflow-x-auto my-3">
                <code className="text-gray-100 text-sm font-mono" {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500/50 bg-blue-500/10 p-3 pl-4 my-3 rounded-md italic text-gray-300"
              {...props}
            />
          ),
          hr: () => <hr className="border-blue-500/20 my-4" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
