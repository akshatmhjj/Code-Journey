import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css"; // soft dark theme

export default function MarkdownRenderer({ text }) {
  if (!text || typeof text !== "string") return null;

  return (
    <div
      className="markdown-body text-gray-100 text-[15px] font-inter leading-[1.6] break-words"
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => (
            <h1
              className="text-lg font-semibold text-blue-300 mt-3 mb-2 border-b border-blue-500/20 pb-1"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="text-base font-semibold text-blue-300 mt-2 mb-1"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="text-[15px] font-semibold text-blue-200 mt-1 mb-1"
              {...props}
            />
          ),
          p: (props) => (
            <p className="my-[6px] text-gray-200 leading-[1.55] block whitespace-pre-wrap" {...props} />
          ),
          a: (props) => (
            <a
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: (props) => (
            <ul className="list-disc list-inside my-2 pl-3 space-y-1 text-gray-200" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal list-inside my-2 pl-3 space-y-1 text-gray-200" {...props} />
          ),
          li: (props) => <li className="ml-1 leading-snug text-gray-200" {...props} />,
          code: ({ inline, className, children, ...props }) => {
            const language = (className || "").replace("language-", "") || "plaintext";
            const content = Array.isArray(children) ? children.join("") : String(children);

            if (inline) {
              return (
                <code
                  className="bg-[#1e293b]/70 text-blue-300 px-1 py-[1px] rounded font-mono text-[14px]"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="my-3 rounded-lg overflow-hidden border border-blue-500/20 bg-[#0f172a] w-full max-w-full">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#1e293b]/60 border-b border-blue-500/20 text-xs text-gray-400 font-mono uppercase tracking-wide">
                  {language}
                </div>
                <pre className="p-3 text-[14px] leading-relaxed font-mono text-gray-100 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
                  <code {...props}>{content}</code>
                </pre>
              </div>
            );
          },
          strong: (props) => <strong className="font-semibold text-gray-100" {...props} />,
          em: (props) => <em className="text-gray-300 italic" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-blue-500/40 bg-blue-500/5 p-2 pl-4 my-2 italic text-gray-300 rounded-md"
              {...props}
            />
          ),
          hr: () => <hr className="border-blue-500/20 my-3" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
