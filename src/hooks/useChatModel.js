import { useState } from 'react'
import { useStore } from '@/stores/useStore'
import { chatModelService } from '@/services/chatModelService'

export const useChatModel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { messages, addMessage, updateLastMessage } = useStore()

  const sendMessageToModel = async (input) => {
    setIsLoading(true)
    const newMessage = { role: 'user', content: input }
    addMessage(newMessage)

    try {
      await chatModelService(
        newMessage,
        messages,
        updateLastMessage,
        addMessage
      )
      const updatedMessages = useStore.getState().messages
      console.log(`Estos son los mensajes del momento: ${updatedMessages}`)
      return updatedMessages
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

  return {
    isLoading,
    sendMessageToModel
  }
}
