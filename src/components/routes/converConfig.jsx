import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStore } from '@/stores/useStore'
import { useNavigate } from 'react-router-dom'
import './styleConverConfig.css'

export function ConverConfig() {
  const [selectedLevel, setSelectedLevel] = useState('')
  const [topic, setTopic] = useState('')
  const { setConversationTopic, setConversationLevel } = useStore()
  const navigate = useNavigate()

  const handleLevelClick = (level) => {
    setSelectedLevel(level)
  }

  const handleTopicClick = (topic) => {
    setTopic(topic)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedLevel && topic) {
      setConversationLevel(selectedLevel)
      setConversationTopic(topic)
      navigate('/new-conversation')
    } else {
      alert('Please select a level and enter a topic.')
    }
  }

  return (
    <form className="grid place-items-center h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Conversation practice ✏️
        </h2>
        <p className="text-md text-muted-foreground">
          Select your English level.
        </p>
        <div className="contenedor">
          <div
            className={`caja caja1 ${selectedLevel === 'A1' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('A1')}
          >
            <span>A1</span>
          </div>
          <div
            className={`caja caja2 ${selectedLevel === 'A2' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('A2')}
          >
            <span>A2</span>
          </div>
          <div
            className={`caja caja3 ${selectedLevel === 'B1' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('B1')}
          >
            <span>B1</span>
          </div>
          <div
            className={`caja caja4 ${selectedLevel === 'B2' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('B2')}
          >
            <span>B2</span>
          </div>
          <div
            className={`caja caja5 ${selectedLevel === 'C1' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('C1')}
          >
            <span>C1</span>
          </div>
          <div
            className={`caja caja6 ${selectedLevel === 'C2' ? 'selected' : ''}`}
            onClick={() => handleLevelClick('C2')}
          >
            <span>C2</span>
          </div>
        </div>
        <p className="text-md text-muted-foreground">
          Enter the topic you want to discuss and click &apos;Start&apos;
        </p>
        <div className="flex gap-2 w-full flex-wrap md:flex-nowrap justify-center">
          <Input
            className="w-full"
            placeholder="Type the topic you want to discuss (e.g., travel, hobbies, work...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button type="submit" className="w-[100px] md:w-auto">Start</Button>
        </div>
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <Button
            variant="outline"
            type="button"
            onClick={() => handleTopicClick('Ordering food at a restaurant')}
          >
            Ordering food at a restaurant
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleTopicClick('Talking about hobbies')}
          >
            Talking about hobbies
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleTopicClick('Job interview practice')}
          >
            Job interview practice
          </Button>
        </div>
      </div>
    </form>
  )
}
