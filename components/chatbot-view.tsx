"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2 } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI assistant. I can answer questions about the transcribed content. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function ChatbotView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "what is the project timeline":
          "Based on the transcript, the project will follow a six-week development cycle with two weeks for testing. Weekly demos will be conducted with the client to gather feedback and make adjustments as needed.",
        "who is on the team":
          "According to the transcript, the team consists of three developers, two QA engineers, and one dedicated designer who will be available throughout the project duration.",
        "how will client feedback be handled":
          "Client feedback will be gathered through weekly demos with the client, allowing the team to make adjustments as needed throughout the development process.",
        "what are the main action items":
          "The main action items include scheduling a kickoff meeting, preparing wireframes, setting up the development environment, creating a detailed project timeline, preparing technical requirements, and scheduling the first client demo session.",
        "is the timeline realistic":
          "The transcript indicates that the timeline is considered tight but achievable with the allocated resources, which include three developers, two QA engineers, and one designer.",
      }

      // Find a matching response or use a default
      let botResponse =
        "I don't have specific information about that in the transcript. Could you ask something else about the project discussion?"

      const lowercaseInput = input.toLowerCase()
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(key)) {
          botResponse = value
          break
        }
      }

      const newBotMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
        <CardDescription>Ask questions about the transcribed content</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[430px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 mt-0.5">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 mt-0.5">
                    <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask a question about the transcript..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

