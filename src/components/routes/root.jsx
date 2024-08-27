import { useTheme } from '../theme-provider.jsx'
import { Switch } from '../ui/switch.jsx'
import { Sidebar } from '../ui/sidebar.jsx'
import { SidebarHeader } from '../ui/sidebarHeader.jsx'
import { Button } from '../ui/button.jsx'
import { useStore } from '@/stores/useStore.js'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

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
          <Button variant="destructive" onClick={handleHomeBtn}>
            Come back home
          </Button>
        )}
        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      </Sidebar>
      <div className="p-4 md:p-[50px]">
        <Outlet />
      </div>
    </>
  )
}
