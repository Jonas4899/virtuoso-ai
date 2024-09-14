import { MarkdownRenderer } from './MarkdownRenderer'

export function BoxMessage({ type, message }) {
  const classType =
    type === 'assistant'
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-input bg-input text-primary dark:text-primary-foreground'

  return (
    <div
      className={`flex w-full mb-10 ${
        type === 'assistant' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`p-5 border leading-7 max-w-2xl rounded-md ${classType}`}>
        <MarkdownRenderer content={message} />
      </div>
    </div>
  )
}
