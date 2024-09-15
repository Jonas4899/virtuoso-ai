import { NavLink } from 'react-router-dom'
import { useStore } from '@/stores/useStore.js'
import { removeLocalChat } from '@/services/chatStorageService'
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
import { useNavigate } from 'react-router-dom'
import { deleteChat } from '@/services/chatService'

export function ChatListItem({ chatId, chatName, handleChatSelect }) {
  const { removeChat } = useStore()
  const navigate = useNavigate()

  const handleSelect = () => {
    handleChatSelect(chatId)
  }

  const handleDelete = async () => {
    try {
      await deleteChat(chatId);
      // Eliminar el chat del localStorage
      removeLocalChat(chatId);
      // Eliminar el chat del store
      removeChat(chatId);
      // Navegar a la página principal
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el chat:', error);
      alert('Hubo un error al eliminar el chat. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex w-full">
      <NavLink
        onClick={handleSelect}
        to={`/chat/${chatId}`}
        className={({ isActive }) =>
          `w-full py-2 px-3 inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground max-w-[200px] truncate overflow-hidden text-ellipsis ${
            isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
          }`
        }
      >
        {chatName}
      </NavLink>

      {/* Popover para las opciones (en este caso, eliminar el chat) */}
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
                  This action cannot be undone. This will permanently delete the
                  chat and remove its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </div>
  )
}
