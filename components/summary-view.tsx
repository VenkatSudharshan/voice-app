"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useMemo } from "react"

// Mock summary data
const mockSummary = {
  title: "Project Planning Meeting",
  date: "May 3, 2025",
  duration: "32 minutes",
  participants: ["John (Project Manager)", "Sarah (Developer)", "Michael (Designer)"],
  keyPoints: [
    "The project will follow a six-week development cycle with two weeks for testing",
    "Resources allocated include three developers, two QA engineers, and one designer",
    "Weekly demos will be conducted with the client to gather feedback",
    "The timeline is considered tight but achievable with the current resources",
    "Design resources will be available throughout the project duration",
    "Client feedback cycles are integrated into the project timeline",
  ],
  conclusion:
    "The team agreed on the project timeline and resource allocation. Weekly demos will be used to gather client feedback and make necessary adjustments. The next meeting will focus on technical requirements and architecture.",
}

interface SummaryViewProps {
  summary: string
}

export default function SummaryView({ summary }: SummaryViewProps) {
  const { toast } = useToast()

  const formattedSummary = useMemo(() => {
    return summary.split('\n').map((line, index) => {
      if (line.match(/^[0-9]+\.|[📝🎯🤝📅]/)) {
        return <h3 key={index} className="font-semibold text-primary">{line}</h3>
      }
      return <p key={index} className="text-sm">{line}</p>
    })
  }, [summary])

  const handleExport = () => {
    const summaryText = `
# ${mockSummary.title}
Date: ${mockSummary.date}
Duration: ${mockSummary.duration}
Participants: ${mockSummary.participants.join(", ")}

## Key Points
${mockSummary.keyPoints.map((point) => `- ${point}`).join("\n")}

## Conclusion
${mockSummary.conclusion}
    `.trim()

    const blob = new Blob([summaryText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "summary.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Summary exported",
      description: "Your summary has been downloaded as a text file",
    })
  }

  return (
    <Card className={`h-[600px] flex flex-col`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>Summary</span>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[520px] pr-4">
          <div className="space-y-4">
            {formattedSummary}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

