export const chatModelService = (
  newMessage,
  messages,
  updateLastMessage,
  addMessage
) => {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/completions?messages=${encodeURIComponent(
        JSON.stringify([...messages, newMessage])
      )}`
    )

    addMessage({ role: 'assistant', content: '' })

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        eventSource.close()
        resolve()
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
      reject(error)
    }
  })
}
