"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock templates data
const mockTemplates = [
  {
    id: 1,
    name: "Meeting Minutes",
    description: "Standard format for IT meeting minutes with action items and decisions",
    content: `# Meeting Minutes: [Project Name]

## Date: [Date]
## Time: [Start Time] - [End Time]
## Location: [Location/Virtual]

## Attendees
- [Name], [Role]
- [Name], [Role]
- [Name], [Role]

## Agenda
1. [Agenda Item 1]
2. [Agenda Item 2]
3. [Agenda Item 3]

## Discussion Points
### [Agenda Item 1]
- [Key point discussed]
- [Key point discussed]
- [Key point discussed]

### [Agenda Item 2]
- [Key point discussed]
- [Key point discussed]
- [Key point discussed]

## Decisions Made
- [Decision 1]
- [Decision 2]
- [Decision 3]

## Action Items
- [ ] [Action Item 1] - Assigned to: [Name], Due: [Date]
- [ ] [Action Item 2] - Assigned to: [Name], Due: [Date]
- [ ] [Action Item 3] - Assigned to: [Name], Due: [Date]

## Next Meeting
- Date: [Date]
- Time: [Time]
- Location: [Location/Virtual]
- Agenda Items: [Preliminary agenda items]`,
  },
  {
    id: 2,
    name: "Technical Specification",
    description: "Template for documenting technical requirements and specifications",
    content: `# Technical Specification Document

## Project Overview
[Brief description of the project]

## System Architecture
[Description of the system architecture, including diagrams if available]

## Functional Requirements
### Requirement 1: [Name]
- Description: [Detailed description]
- Acceptance Criteria: [Criteria for acceptance]
- Priority: [High/Medium/Low]

### Requirement 2: [Name]
- Description: [Detailed description]
- Acceptance Criteria: [Criteria for acceptance]
- Priority: [High/Medium/Low]

## Non-Functional Requirements
### Performance
- [Performance requirement 1]
- [Performance requirement 2]

### Security
- [Security requirement 1]
- [Security requirement 2]

### Scalability
- [Scalability requirement 1]
- [Scalability requirement 2]

## API Specifications
### Endpoint 1: [Endpoint Name]
- URL: [URL]
- Method: [GET/POST/PUT/DELETE]
- Request Parameters: [Parameters]
- Response Format: [Format]
- Example: [Example request/response]

## Database Schema
[Description of database schema, including tables, relationships, and fields]

## Testing Strategy
[Description of testing approach, including unit tests, integration tests, and user acceptance tests]

## Deployment Strategy
[Description of deployment approach, including environments, CI/CD, and rollback procedures]

## Timeline
[Project timeline, including milestones and deliverables]`,
  },
  {
    id: 3,
    name: "Project Status Report",
    description: "Weekly IT project status report template",
    content: `# Project Status Report

## Project: [Project Name]
## Date: [Report Date]
## Prepared by: [Name]

## Executive Summary
[Brief summary of project status, including overall health and key achievements]

## Project Timeline
- Start Date: [Start Date]
- End Date: [End Date]
- Current Phase: [Phase]
- Timeline Status: [On Track/At Risk/Delayed]

## Accomplishments This Week
- [Accomplishment 1]
- [Accomplishment 2]
- [Accomplishment 3]

## Planned Activities for Next Week
- [Activity 1]
- [Activity 2]
- [Activity 3]

## Issues and Risks
### Issue 1: [Issue Name]
- Description: [Description]
- Impact: [High/Medium/Low]
- Mitigation Plan: [Plan]
- Status: [Open/In Progress/Resolved]

### Risk 1: [Risk Name]
- Description: [Description]
- Probability: [High/Medium/Low]
- Impact: [High/Medium/Low]
- Mitigation Plan: [Plan]

## Budget Status
- Approved Budget: [Amount]
- Spent to Date: [Amount]
- Remaining: [Amount]
- Budget Status: [On Track/At Risk/Over Budget]

## Resource Allocation
- [Resource 1]: [Allocation %]
- [Resource 2]: [Allocation %]
- [Resource 3]: [Allocation %]

## Key Decisions Needed
- [Decision 1]
- [Decision 2]

## Additional Notes
[Any additional information or notes]`,
  },
  {
    id: 4,
    name: "Software Release Notes",
    description: "Template for documenting software releases",
    content: `# Release Notes

## [Product Name] - Version [Version Number]
## Release Date: [Release Date]

## Overview
[Brief overview of the release, including major features and improvements]

## New Features
- [Feature 1]: [Description]
- [Feature 2]: [Description]
- [Feature 3]: [Description]

## Enhancements
- [Enhancement 1]: [Description]
- [Enhancement 2]: [Description]
- [Enhancement 3]: [Description]

## Bug Fixes
- [Bug Fix 1]: [Description]
- [Bug Fix 2]: [Description]
- [Bug Fix 3]: [Description]

## Known Issues
- [Issue 1]: [Description and workaround if available]
- [Issue 2]: [Description and workaround if available]
- [Issue 3]: [Description and workaround if available]

## Technical Changes
- [Technical Change 1]: [Description]
- [Technical Change 2]: [Description]
- [Technical Change 3]: [Description]

## Deployment Instructions
[Step-by-step instructions for deploying the release]

## Rollback Procedures
[Step-by-step instructions for rolling back the release if necessary]

## Documentation Updates
[Links to updated documentation]

## Support
For support, please contact [Support Email/Phone]`,
  },
  {
    id: 5,
    name: "Incident Report",
    description: "IT incident report template for documenting and analyzing incidents",
    content: `# Incident Report

## Incident Overview
- Incident ID: [ID]
- Date and Time: [Date and Time]
- Duration: [Duration]
- Severity: [Critical/High/Medium/Low]
- Status: [Resolved/In Progress]

## Incident Description
[Detailed description of the incident, including what happened and the impact]

## Systems Affected
- [System 1]
- [System 2]
- [System 3]

## Impact
- Users Affected: [Number or percentage]
- Services Affected: [List of services]
- Business Impact: [Description of business impact]

## Root Cause Analysis
[Detailed analysis of the root cause of the incident]

## Resolution
[Description of how the incident was resolved]

## Timeline
- [Time]: [Event]
- [Time]: [Event]
- [Time]: [Event]

## Preventive Measures
[Description of measures to prevent similar incidents in the future]

## Action Items
- [ ] [Action Item 1] - Assigned to: [Name], Due: [Date]
- [ ] [Action Item 2] - Assigned to: [Name], Due: [Date]
- [ ] [Action Item 3] - Assigned to: [Name], Due: [Date]

## Lessons Learned
[Key takeaways and lessons learned from the incident]

## Attachments
[Links to relevant logs, screenshots, or other documentation]`,
  },
]

export default function TemplatesView() {
  const [activeTemplate, setActiveTemplate] = useState(mockTemplates[0].id.toString())
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)

    toast({
      title: "Template copied",
      description: "The template has been copied to your clipboard",
    })
  }

  const handleExport = (name: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name.toLowerCase().replace(/\s+/g, "-")}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Template exported",
      description: "Your template has been downloaded as a markdown file",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates</CardTitle>
        <CardDescription>Convert your transcript into useful document templates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            {mockTemplates.map((template) => (
              <TabsTrigger key={template.id} value={template.id.toString()}>
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {mockTemplates.map((template) => (
            <TabsContent key={template.id} value={template.id.toString()}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(template.id, template.content)}>
                      {copiedId === template.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport(template.name, template.content)}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[400px] w-full border rounded-md bg-muted/30 p-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{template.content}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

