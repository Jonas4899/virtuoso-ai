import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'

import { BoxMessage } from '../ui/boxMessage'

export function ConversationPage() {
  return (
    <div className="flex flex-col h-full justify-between gap-9">
      <ScrollArea className="h-[500px] w-full">
        <div className="p-5 flex flex-col gap-5">
          <BoxMessage
            type="ai"
            message="Hola, soy Virtuoso.ai, ¿en qué puedo ayudarte?"
          />
        </div>
      </ScrollArea>
      <div className="flex gap-4">
        <Textarea
          placeholder="Escribe lo que quieras a Virtuoso.ai"
          id="message"
          className="p-5"
        />
        <Button variant="outline">
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  )
}
