import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { BoxMessage } from '../ui/boxMessage'
import { useStore } from '@/stores/useStore'
import { useChatModel } from '@/hooks/useChatModel'
import { useChatManagement } from '@/hooks/useChatManagement'

export function ConversationPage() {
  const { chatId } = useParams()
  const [input, setInput] = useState('')
  const { isLoading, sendMessageToModel } = useChatModel()
  const { handleUpdateChat } = useChatManagement()
  const { messages } = useStore()
  const messagesEndRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const updatedMessages = await sendMessageToModel(input)
    handleUpdateChat(chatId, updatedMessages)
    setInput('')
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-full justify-between gap-9">
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
        {messages
          .filter((message, index) => {
            if (message.content === "Tell me when You're ready to start! 🚀") {
              return (
                messages.findIndex(
                  (msg) =>
                    msg.content === "Tell me when You're ready to start! 🚀"
                ) === index
              )
            }
            return true
          })
          .map((message, index) => {
            if (message.role !== 'system') {
              return (
                <BoxMessage
                  key={index}
                  type={message.role === 'user' ? 'user' : 'assistant'}
                  message={message.content}
                />
              )
            }
            return null
          })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <Textarea
          placeholder="Escribe lo que quieras a Virtuoso.ai"
          id="message"
          className="p-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.shiftKey &&
              !e.ctrlKey &&
              !e.altKey &&
              !isLoading
            ) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button type="submit" variant="outline" disabled={isLoading}>
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  )
}
