import { useCallback } from 'react'
import { debounce } from '@/utils/debounce'
import { createChat, updateChat } from '@/services/chatService'
import { saveChats } from '@/services/chatStorageService'
import { useStore } from '@/stores/useStore'

export const useChatManagement = () => {
  const { currentIdChat, setCurrentIdChat, addChat } = useStore()

  const handleUpdateChat = useCallback(
    debounce(async (id, messages) => {
      try {
        await updateChat(id, messages)
        console.log(`Chat actualizado!: ${id}`)
      } catch (err) {
        console.error('Error al actualizar el recurso:', err)
      }
    }, 2000),
    []
  )

  const createNewChat = async (messages, title) => {
    try {
      const data = { title, messages }
      const nuevoChat = await createChat(data)
      // Save the chat in the local storage
      saveChats({ id: nuevoChat._id, title: nuevoChat.title })
      // Set the current chat id in the store and add the chat
      setCurrentIdChat(`${nuevoChat._id}`)
      addChat({ id: nuevoChat._id, title: nuevoChat.title })
      return nuevoChat._id
    } catch (err) {
      console.error('Error al crear el chat:', err)
      return null
    }
  }

  return {
    currentIdChat,
    createNewChat,
    handleUpdateChat
  }
}
