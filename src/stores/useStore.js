import create from 'zustand'

export const useStore = create((set) => ({
  messages: [
    {
      role: 'assistant',
      content: 'Hola, soy Virtuoso.ai, ¿en qué puedo ayudarte?'
    }
  ],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),
  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages]
      messages[messages.length - 1].content += content
      return { messages }
    }),
  resetMessages: () =>
    set({
      messages: [
        {
          role: 'assistant',
          content: 'Hola, soy Virtuoso.ai, ¿en qué puedo ayudarte?'
        }
      ]
    })
}))
