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
