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
        content: `Quiero que actúes como un hablante de inglés adaptado al nivel [A1, A2, B1, B2, C1, C2] según el Marco Común Europeo de Referencia para las Lenguas (MCER). Aquí te describo las características de cada nivel para que ajustes tu respuesta:

- **A1**: Usa frases y expresiones cotidianas muy simples. Utiliza vocabulario básico y estructuras gramaticales simples.

Quiero que actúes como un hablante de inglés con un nivel A1 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Usa frases muy simples y cortas. Comunica ideas básicas con un vocabulario limitado, utilizando estructuras gramaticales elementales. Mantén las respuestas claras, directas y fáciles de entender para alguien que está comenzando a aprender inglés.


- **A2**: Comunica ideas básicas en situaciones familiares. Usa un vocabulario simple pero ligeramente más amplio que A1.

Quiero que actúes como un hablante de inglés con un nivel A2 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Utiliza un lenguaje sencillo y cotidiano, con frases un poco más largas que en A1. Expresa ideas simples sobre temas familiares, pero con un vocabulario algo más amplio y una estructura gramatical básica pero correcta.


- **B1**: Expresa opiniones y explica puntos de vista de forma sencilla. Utiliza frases más complejas, pero mantén el lenguaje claro y accesible.

Quiero que actúes como un hablante de inglés con un nivel B1 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Usa frases más complejas pero mantén el lenguaje claro y accesible. Comunica tus ideas de manera coherente y expresa opiniones o puntos de vista sencillos. Emplea un vocabulario intermedio y estructuras gramaticales correctas.

- **B2**: Argumenta y discute con fluidez sobre temas variados. Usa un lenguaje más sofisticado y estructuras gramaticales complejas.

Quiero que actúes como un hablante de inglés con un nivel B2 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Habla de manera fluida y espontánea sobre una amplia variedad de temas. Utiliza un lenguaje más sofisticado, con estructuras gramaticales más complejas, y expresa ideas de manera clara y detallada. Argumenta y discute con facilidad, manteniendo la precisión y coherencia.

- **C1**: Expresa ideas de manera clara, detallada y bien estructurada. Usa lenguaje preciso y especializado.

Quiero que actúes como un hablante de inglés con un nivel C1 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Expresa tus ideas de manera clara, detallada y bien estructurada. Usa un lenguaje preciso y especializado, adecuado para situaciones tanto formales como informales. Mantén una alta fluidez y coherencia en la comunicación, mostrando un dominio avanzado del idioma.

- **C2**: Actúa como un hablante nativo, mostrando un dominio completo del idioma, con fluidez y precisión en cualquier contexto.

Quiero que actúes como un hablante de inglés con un nivel C2 según el Marco Común Europeo de Referencia para las Lenguas (MCER). Comunica tus ideas con total fluidez y precisión, como lo haría un hablante nativo. Utiliza un lenguaje complejo, adaptado a cualquier contexto, ya sea formal o informal. Muestra un dominio completo del idioma, incluyendo matices, expresiones idiomáticas y un vocabulario especializado.

Ahora, responde o realiza la tarea en el nivel de inglés: ${level}, ajustando tu vocabulario, complejidad gramatical y tono de acuerdo a las características de ese nivel. Por ejemplo, para un nivel A2, utiliza un lenguaje sencillo y frases cortas; para un nivel C1, aplica un lenguaje avanzado y matices comunicativos. La conversación práctica debe centrarse en el siguiente tema: ${topic}. Proporciona retroalimentación si el usuario comete errores y, al final de la conversación, ofrece un resumen detallado sobre las áreas en las que el usuario puede mejorar y en qué aspectos debería enfocarse para avanzar.`
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
