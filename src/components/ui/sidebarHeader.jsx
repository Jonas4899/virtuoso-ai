import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import avatarImg from './../resources/3d_avatar.jpg'

export function SidebarHeader() {
  return (
    <div className="flex items-center justify-center gap-3 w-full">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarImg} />
        <AvatarFallback>User image</AvatarFallback>
      </Avatar>
      <h3 className="leading-7">User</h3>
    </div>
  )
}
