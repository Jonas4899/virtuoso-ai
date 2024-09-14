import { useEffect, useState } from 'react'
import { useTheme } from '../theme-provider.jsx'
import { Switch } from '../ui/switch.jsx'
import { Sidebar } from '../ui/sidebar.jsx'
import { SidebarHeader } from '../ui/sidebarHeader.jsx'
import { Button } from '../ui/button.jsx'
import { ChatList } from '../ui/ChatList.jsx'
import { ChatListItem } from '../ui/chatListItem.jsx'
import { getChats } from '@/services/chatStorageService.js'
import { useStore } from '@/stores/useStore.js'
import { Outlet, useNavigate } from 'react-router-dom'
import { HomeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { getChat } from '@/services/chatService.js'
import { HamburgerMenu } from '../ui/HamburgerMenu.jsx'

export function Root() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const {
    chats,
    setChats,
    resetMessages,
    resetCurrentIdChat,
    setCurrentIdChat,
    setMessages
  } = useStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleHomeBtn = () => {
    navigate('/')
    resetMessages()
    resetCurrentIdChat()
  }

  useEffect(() => {
    const storedChats = getChats()
    setChats(storedChats)
  }, [setChats])

  const handleChatSelect = async (chatId) => {
    setCurrentIdChat(chatId)
    try {
      const chat = await getChat(chatId)
      setMessages(chat.messages)
    } catch (error) {
      console.error('Error al cargar el chat:', error)
    }
    navigate(`/chat/${chatId}`)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:hidden">
        <Button onClick={toggleMenu} className="m-2">
          <HamburgerMenuIcon />
        </Button>
      </div>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <SidebarContent
          chats={chats}
          handleHomeBtn={handleHomeBtn}
          handleChatSelect={handleChatSelect}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </HamburgerMenu>
      <Sidebar className="hidden md:flex md:flex-col md:w-64">
        <SidebarContent
          chats={chats}
          handleHomeBtn={handleHomeBtn}
          handleChatSelect={handleChatSelect}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </Sidebar>
      <div className="flex-grow p-4 md:p-[50px] w-full">
        <Outlet />
      </div>
    </div>
  )
}

function SidebarContent({ chats, handleHomeBtn, handleChatSelect, toggleTheme, theme }) {
  return (
    <div className='flex flex-col h-full justify-between items-center gap-10'>
      <div className="flex flex-col gap-10">
        <div>
          <SidebarHeader />
        </div>
        <Button className="flex gap-1 items-center" onClick={handleHomeBtn}>
          <HomeIcon />
          <span>Home</span>
        </Button>
        {chats.length > 0 ? (
          <ChatList>
            {chats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chatId={chat.id}
                chatName={chat.title}
                handleChatSelect={handleChatSelect}
              />
            ))}
          </ChatList>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-center">No hay chats guardados aún. ¡Comienza una nueva conversación!</p>
          </div>
        )}
      </div>
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
    </div>
  )
}
