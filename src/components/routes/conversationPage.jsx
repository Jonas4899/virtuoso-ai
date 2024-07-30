import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BoxMessage } from '../ui/boxMessage'
import { useStore } from '@/stores/useStore'

export function ConversationPage() {
  const [input, setInput] = useState('')
  const { messages, addMessage, updateLastMessage } = useStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const newMessage = { role: 'user', content: input }
    addMessage(newMessage)
    setInput('')

    try {
      const eventSource = new EventSource(
        `http://localhost:3000/completions?messages=${encodeURIComponent(
          JSON.stringify([...messages, newMessage])
        )}`
      )

      addMessage({
        role: 'assistant',
        content: ''
      })

      eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
          eventSource.close()
        } else {
          try {
            const data = event.data.startsWith('data: ')
              ? event.data.slice(6)
              : event.data
            const parsedData = JSON.parse(data)
            const assistantMessage = parsedData.choices[0].delta.content
            if (assistantMessage) {
              updateLastMessage(assistantMessage)
            }
          } catch (error) {
            console.error('Error parsing SSE message:', error)
            console.log('Raw message:', event.data)
          }
        }
      }

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error)
        addMessage({
          role: 'assistant',
          content:
            'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.'
        })
        eventSource.close()
      }
    } catch (error) {
      console.error('Error:', error)
      addMessage({
        role: 'assistant',
        content:
          'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full justify-between gap-9">
      <ScrollArea className="h-[500px] w-full">
        <div className="p-5 flex flex-col gap-5">
          {messages.map((message, index) => (
            <BoxMessage
              key={index}
              type={message.role === 'user' ? 'user' : 'assistant'}
              message={message.content}
            />
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Textarea
          placeholder="Escribe lo que quieras a Virtuoso.ai"
          id="message"
          className="p-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" variant="outline" disabled={isLoading}>
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  )
}
