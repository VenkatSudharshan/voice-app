"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Calendar, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Mock action items data
const mockActionItems = [
  {
    id: 1,
    task: "Schedule kickoff meeting with the development team",
    assignee: "John",
    dueDate: "May 10, 2025",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    task: "Prepare initial wireframes for client review",
    assignee: "Michael",
    dueDate: "May 12, 2025",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    task: "Set up development environment and project repositories",
    assignee: "Sarah",
    dueDate: "May 8, 2025",
    priority: "High",
    completed: false,
  },
  {
    id: 4,
    task: "Create detailed project timeline with milestones",
    assignee: "John",
    dueDate: "May 7, 2025",
    priority: "High",
    completed: false,
  },
  {
    id: 5,
    task: "Prepare technical requirements document",
    assignee: "Sarah",
    dueDate: "May 15, 2025",
    priority: "Medium",
    completed: false,
  },
  {
    id: 6,
    task: "Schedule first client demo session",
    assignee: "John",
    dueDate: "May 20, 2025",
    priority: "Low",
    completed: false,
  },
]

interface ActionItemsViewProps {
  className?: string
}

export default function ActionItemsView({ className }: ActionItemsViewProps = {}) {
  const [actionItems, setActionItems] = useState(mockActionItems)
  const { toast } = useToast()

  const toggleCompleted = (id: number) => {
    setActionItems(actionItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const handleExport = () => {
    const actionItemsText = `
# Action Items
Date: May 3, 2025

${actionItems
  .map(
    (item) => `
## ${item.task}
- Assignee: ${item.assignee}
- Due Date: ${item.dueDate}
- Priority: ${item.priority}
- Status: ${item.completed ? "Completed" : "Pending"}
`,
  )
  .join("\n")}
    `.trim()

    const blob = new Blob([actionItemsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "action-items.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Action items exported",
      description: "Your action items have been downloaded as a text file",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200 font-medium"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200 font-medium"
      case "Low":
        return "bg-green-100 text-green-800 border border-green-200 font-medium"
      default:
        return "bg-blue-100 text-blue-800 border border-blue-200 font-medium"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>Action Items</span>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[520px] pr-4">
          <div className="space-y-4">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg transition-all duration-300 ${
                  item.completed
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`task-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleCompleted(item.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <label
                      htmlFor={`task-${item.id}`}
                      className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {item.task}
                    </label>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{item.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(item.priority)}`}>{item.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

