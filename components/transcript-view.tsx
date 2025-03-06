"use client"

import { useState, useEffect } from "react"
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
  transcriptData?: any
}

export default function TranscriptView({ className, transcriptData }: TranscriptViewProps = {}) {
  const [transcript, setTranscript] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (transcriptData?.segments) {
      setTranscript(transcriptData.segments)
    }
  }, [transcriptData])

  const handleExport = () => {
    if (!transcript.length) return

    const transcriptText = transcript.join("\n\n")
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
          {transcript.map((segment: string, index: number) => (
            <div key={index} className="mb-6">
              <div className="transcript-segment bg-muted p-4 rounded-lg">
                <p className="text-sm">{segment}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

