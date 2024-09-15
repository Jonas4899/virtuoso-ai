import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export function HamburgerMenu({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div
      className={cn(
        'h-full fixed inset-0 bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="h-full overflow-y-auto p-4">
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          X
        </button>
        <div className="mt-12">{children}</div>
      </div>
    </div>
  )
}
