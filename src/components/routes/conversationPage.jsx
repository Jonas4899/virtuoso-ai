import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BoxMessage } from '../ui/boxMessage'
import { useStore } from '@/stores/useStore'

export function ConversationPage() {
  const [input, setInput] = useState('')
  const { messages, addMessage } = useStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const newMessage = { role: 'user', content: input }
    addMessage(newMessage)
    setInput('')

    try {
      const response = await fetch('http://localhost:3000/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: [...messages, newMessage] })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message

      addMessage(assistantMessage)
      console.log(messages)
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
