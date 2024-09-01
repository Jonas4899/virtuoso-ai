import ReactMarkdown from 'react-markdown'

export function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        blockquote: ({ children, ...props }) => (
          <blockquote
            style={{
              borderLeft: '4px solid #007acc',
              paddingLeft: '1em',
              color: '#555',
              fontStyle: 'italic',
              margin: '1em 0',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}
            {...props}
          >
            {children}
          </blockquote>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
