import { LogoVirtuoso } from '../resources/logo_virtuoso.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  const handleStartConversation = () => {
    navigate('/new-conversation')
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full">
      <LogoVirtuoso width={200} height={200} />
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome to Virtuoso.Ai
      </h2>
      <div className="flex gap-10">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Practice Conversation by Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Enhance your language skills by chatting with our AI, designed to
              simulate natural and educational conversations.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={handleStartConversation}>
              Start conversation 🚀
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
