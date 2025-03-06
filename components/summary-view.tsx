"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

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
  className?: string
}

export default function SummaryView({ className }: SummaryViewProps = {}) {
  const { toast } = useToast()

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
    <Card className={`h-[600px] flex flex-col ${className}`}>
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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">{mockSummary.title}</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span>Date: {mockSummary.date}</span>
                </div>
                <div className="flex items-center">
                  <span>Duration: {mockSummary.duration}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">Participants</h4>
              <ul className="list-disc pl-5 space-y-1">
                {mockSummary.participants.map((participant, index) => (
                  <li key={index} className="text-sm">
                    {participant}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">Key Points</h4>
              <ul className="list-disc pl-5 space-y-2">
                {mockSummary.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">Conclusion</h4>
              <p className="text-sm">{mockSummary.conclusion}</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

