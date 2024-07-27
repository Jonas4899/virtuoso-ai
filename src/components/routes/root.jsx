import { useTheme } from '../theme-provider.jsx'
import { Switch } from '../ui/switch.jsx'
import { Sidebar } from '../ui/sidebar.jsx'
import { SidebarHeader } from '../ui/sidebarHeader.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { ChatList } from '../ui/ChatList.jsx'
import { ChatListItem } from '../ui/chatListItem.jsx'
import { Button } from '../ui/button.jsx'

export function Root() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const handleRedirectionNewChat = () => {
    navigate('/new-chat')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <Sidebar>
        <div className="w-full flex flex-col gap-6">
          <SidebarHeader />
          <Button variant="outline" onClick={handleRedirectionNewChat}>
            New Chat
          </Button>
          <ChatList></ChatList>
        </div>
        <Switch onCheckedChange={toggleTheme} />
      </Sidebar>
      <div className="p-[50px]">
        <Outlet />
      </div>
    </>
  )
}
