import { create } from 'zustand'

export const useStore = create((set) => ({
  messages: [
    {
      role: 'assistant',
      content: 'Hola, soy Virtuoso.ai, ¿en qué puedo ayudarte?'
    }
  ],
  topic: '',
  level: '',

  // Función para agregar un mensaje
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),

  // Función para actualizar el contenido del último mensaje
  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages]
      messages[messages.length - 1].content += content
      return { messages }
    }),

  // Función para reiniciar los mensajes
  resetMessages: () =>
    set({
      messages: [
        {
          role: 'assistant',
          content: 'Hola, soy Virtuoso.ai, ¿en qué puedo ayudarte?'
        }
      ]
    }),

  // Función para actualizar el tema de la conversación
  setConversationTopic: (topic) =>
    set(() => ({
      topic
    })),

  // Función para actualizar el nivel de inglés
  setConversationLevel: (level) =>
    set(() => ({
      level
    }))
}))
