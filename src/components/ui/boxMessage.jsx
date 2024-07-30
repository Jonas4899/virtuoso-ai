import Markdown from 'react-markdown'

export function BoxMessage({ type, message }) {
  const classType =
    type === 'assistant'
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-input bg-input text-card-foreground'

  return (
    <div
      className={`flex w-full ${
        type === 'assistant' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`p-5 border leading-7 max-w-2xl rounded-md ${classType}`}>
        <Markdown>{message}</Markdown>
      </div>
    </div>
  )
}
