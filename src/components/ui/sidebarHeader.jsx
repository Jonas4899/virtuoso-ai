import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import avatarImg from './../resources/avatar.jpeg'

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-3 w-full">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarImg} />
        <AvatarFallback>Luffy D. Monkey Avatar</AvatarFallback>
      </Avatar>
      <h3 className="leading-7">Luffy D. Monkey</h3>
    </div>
  )
}
