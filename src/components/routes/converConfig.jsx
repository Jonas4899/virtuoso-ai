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
      <div className="flex flex-col gap-6 items-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
          Conversation practice ✏️
        </h2>
        <p className="leading-7">
          Enter a topic and choose your English level below to start chatting
          with our AI and improve your English skills.
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
        <div className="flex gap-2 w-full">
          <Input
            className="w-full"
            placeholder="Please enter the topic of your conversation"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button type="submit">Start</Button>
        </div>
      </div>
    </form>
  )
}
