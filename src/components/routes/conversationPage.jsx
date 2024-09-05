import { useState, useEffect } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BoxMessage } from '../ui/boxMessage'
import { useStore } from '@/stores/useStore'

export function ConversationPage() {
  const [input, setInput] = useState('')
  const { topic, level, messages, addMessage, updateLastMessage } = useStore()
  const [isLoading, setIsLoading] = useState(false)

  const sendMessageToModel = async () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessageToModel()
  }

  useEffect(() => {
    const InitializeConversation = () => {
      addMessage({
        role: 'system',
        content: `You are a native English speaker, conversational machine that helps people improving their language skills. You adapt your vocalbulary in terms of The Common European Framework of Reference for Languages (CEFR). Your functionality is to follow the next Steps:

Step 1 - In the next text, delimited by """ at start and """ at end, it's defined the level and topic of the practice conversation user wants to have:
"""
Conversation for a ${level} language learner. The topic I want to practice a conversation is: ${topic}
""" 

Step 2 - Define a role for you in this conversation, and start right away with the conversation practice, taking into account the step 1's information provided. Remember to return your answer in Markdown syntaxis, using emojis properly. There are some posibilities in this conversation, like the user did something wrong or you have a suggestion, so in you're response that's the first thing you are going to point, taking into account this things:
- Every time the user sends to you an answer, you are going to check their grammar, vocabulary and tone. If there is a suggestion or correction, in your response you first answer right away with it, then you continue the conversation without further explanation. If it's a suggestion, the block of the suggestion should be putted as a quote like this:
> 💡Suggestion: <Suggestion text>
If the sentence has something wrong, Inside the quote you're going to point the specific thing the user had wrong, and a small explanation of the rule or vocabulary use, like this:
> ❌ Correction: <Correction text>
- If user send to you a message, telling you to stop this conversation practice, or when you consider that the conversation has ended. You are going to end the practice and show a summary of the things the user did well in the conversation, things the user did wrong and should practice. the block of the summary should be putted as a quote in markdown`
      })
      addMessage({
        role: 'assistant',
        content: "Tell me when You're ready to start! 🚀"
      })
    }

    InitializeConversation()
  }, [topic, level, addMessage])

  return (
    <div className="flex flex-col h-full justify-between gap-9">
      <ScrollArea className="h-[500px] w-full">
        <div className="p-5 flex flex-col gap-5">
          {messages
            .filter((message, index) => {
              if (
                message.content === "Tell me when You're ready to start! 🚀"
              ) {
                // Encontrar el último mensaje que tiene este contenido
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
            })}
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
