"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Calendar, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"

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
  actionItems: string
}

export default function ActionItemsView({ actionItems }: ActionItemsViewProps) {
  const formattedActionItems = useMemo(() => {
    return actionItems.split('\n').map((item, index) => (
      item.trim() && (
        <div key={index} className="bg-muted rounded-lg p-3">
          <p className="text-sm">{item}</p>
        </div>
      )
    ))
  }, [actionItems])

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {formattedActionItems}
      </div>
    </ScrollArea>
  )
}

