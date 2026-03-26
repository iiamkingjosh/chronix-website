'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PostContent({ content }) {
  if (!content) {
    return <div className="text-red-500">Error: No content to display</div>;
  }

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg my-6 shadow-lg"
              {...props}
            />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
              {children}
            </blockquote>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}