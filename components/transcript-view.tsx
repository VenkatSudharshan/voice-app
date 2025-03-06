"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Download, Edit, Save, UserCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock transcript data
const mockTranscript = [
  {
    id: 1,
    speaker: "Speaker 1",
    text: "Hello everyone, thanks for joining this meeting today. We're going to discuss the new project requirements.",
    timestamp: "00:00:05",
  },
  {
    id: 2,
    speaker: "Speaker 2",
    text: "Great, I've been looking forward to this. I have some questions about the timeline.",
    timestamp: "00:00:15",
  },
  {
    id: 3,
    speaker: "Speaker 1",
    text: "Sure, we can go over the timeline. We're looking at a six-week development cycle with two weeks for testing.",
    timestamp: "00:00:25",
  },
  {
    id: 4,
    speaker: "Speaker 3",
    text: "That seems tight. Do we have all the resources we need for this timeline?",
    timestamp: "00:00:40",
  },
  {
    id: 5,
    speaker: "Speaker 1",
    text: "Good question. We've allocated three developers and two QA engineers for this project.",
    timestamp: "00:00:55",
  },
  {
    id: 6,
    speaker: "Speaker 2",
    text: "What about the design resources? Will they be available throughout the project?",
    timestamp: "00:01:10",
  },
  {
    id: 7,
    speaker: "Speaker 1",
    text: "Yes, we have one dedicated designer for the entire duration of the project.",
    timestamp: "00:01:20",
  },
  {
    id: 8,
    speaker: "Speaker 3",
    text: "Great. And what about the client feedback cycles? How are we handling those?",
    timestamp: "00:01:35",
  },
  {
    id: 9,
    speaker: "Speaker 1",
    text: "We'll have weekly demos with the client to gather feedback and make adjustments as needed.",
    timestamp: "00:01:50",
  },
  {
    id: 10,
    speaker: "Speaker 2",
    text: "That sounds good. I think this approach will help us stay on track.",
    timestamp: "00:02:05",
  },
]

interface TranscriptViewProps {
  className?: string
}

export default function TranscriptView({ className }: TranscriptViewProps = {}) {
  const [transcript, setTranscript] = useState(mockTranscript)
  const [editingSpeaker, setEditingSpeaker] = useState<number | null>(null)
  const [speakerName, setSpeakerName] = useState("")
  const { toast } = useToast()

  const handleEditSpeaker = (id: number, currentName: string) => {
    setEditingSpeaker(id)
    setSpeakerName(currentName)
  }

  const handleSaveSpeaker = (id: number) => {
    if (speakerName.trim()) {
      setTranscript(
        transcript.map((item) =>
          item.speaker === transcript.find((t) => t.id === id)?.speaker
            ? { ...item, speaker: speakerName.trim() }
            : item,
        ),
      )
      setEditingSpeaker(null)
      setSpeakerName("")

      toast({
        title: "Speaker name updated",
        description: "The speaker name has been successfully updated",
      })
    }
  }

  const handleExport = () => {
    const transcriptText = transcript.map((item) => `[${item.timestamp}] ${item.speaker}: ${item.text}`).join("\n\n")

    const blob = new Blob([transcriptText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Transcript exported",
      description: "Your transcript has been downloaded as a text file",
    })
  }

  return (
    <Card className={`h-[600px] flex flex-col ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>Transcript</span>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[520px] pr-4">
          {transcript.map((item, index) => (
            <div key={item.id} className="mb-6">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center`}
                  >
                    <UserCircle className="h-5 w-5 text-white" />
                  </div>
                  {editingSpeaker === item.id ? (
                    <div className="flex items-center gap-2 ml-2">
                      <Input
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                        className="h-8 w-40 border-purple-300 focus-visible:ring-purple-500"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSaveSpeaker(item.id)}
                        className="h-8 px-2 hover:bg-purple-100 hover:text-purple-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 ml-2">
                      <span className="font-medium">{item.speaker}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditSpeaker(item.id, item.speaker)}
                        className="h-6 w-6 p-0 hover:bg-purple-100 hover:text-purple-700"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground ml-auto">{item.timestamp}</span>
              </div>
              <p className="text-sm pl-7">{item.text}</p>
              {index < transcript.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

