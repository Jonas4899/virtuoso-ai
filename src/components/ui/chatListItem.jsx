import { NavLink } from 'react-router-dom'
import { Button } from './button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

export function ChatListItem({ route, chatName }) {
  return (
    <div className="flex">
      <NavLink
        to={route}
        className={`w-full py-2 px-3 inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${({
          isActive,
          isPending
        }) => (isPending ? 'pending' : isActive ? 'active' : '')}`}
      >
        {chatName}
      </NavLink>
      <Popover>
        <PopoverTrigger className="p-3">
          <DotsHorizontalIcon />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <AlertDialog>
            <AlertDialogTrigger>Delete</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </div>
  )
}
