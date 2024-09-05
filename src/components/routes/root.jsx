import { useTheme } from '../theme-provider.jsx'
import { Switch } from '../ui/switch.jsx'
import { Sidebar } from '../ui/sidebar.jsx'
import { SidebarHeader } from '../ui/sidebarHeader.jsx'
import { Button } from '../ui/button.jsx'
import { useStore } from '@/stores/useStore.js'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { HomeIcon } from '@radix-ui/react-icons'

export function Root() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { resetMessages } = useStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleHomeBtn = () => {
    navigate('/')
    resetMessages()
  }

  return (
    <>
      <Sidebar>
        <div>
          <SidebarHeader />
        </div>
        {location.pathname !== '/' && (
          <Button className="flex gap-1 items-center" onClick={handleHomeBtn}>
            <HomeIcon />
            <span>Home</span>
          </Button>
        )}
        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      </Sidebar>
      <div className="p-4 md:p-[50px] w-full">
        <Outlet />
      </div>
    </>
  )
}
