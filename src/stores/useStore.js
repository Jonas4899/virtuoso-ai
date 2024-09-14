import { create } from 'zustand'

export const useStore = create((set) => ({
  currentIdChat: '',
  messages: [],
  topic: '',
  level: '',
  chats: [],

  // Funciones para manejar los chats
  setChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat]
    })),

  removeChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId)
    })),

  // Función para agregar un mensaje
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),

  setMessages: (messages) =>
    set(() => ({
      messages
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
      messages: []
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
    })),

  // Función para actualizar el id del chat actual
  setCurrentIdChat: (currentIdChat) =>
    set(() => ({
      currentIdChat
    })),

  resetCurrentIdChat: () =>
    set({
      currentIdChat: ''
    })
}))
