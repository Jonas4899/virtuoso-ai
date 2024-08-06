import { useTheme } from '../theme-provider.jsx'
import { Switch } from '../ui/switch.jsx'
import { Sidebar } from '../ui/sidebar.jsx'
import { SidebarHeader } from '../ui/sidebarHeader.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

export function Root() {
  const { theme, setTheme } = useTheme()
  // const navigate = useNavigate()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <Sidebar>
        <div className="w-full flex flex-col gap-6">
          <SidebarHeader />
        </div>
        <Switch onCheckedChange={toggleTheme} />
      </Sidebar>
      <div className="p-[50px]">
        <Outlet />
      </div>
    </>
  )
}
