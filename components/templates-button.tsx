"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUp, Copy, Check, Download, Loader2 } from "lucide-react"
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

const GEMINI_API_KEY = "AIzaSyAT0RhIoutobf_iLkppxs-vMY--PqMuZnY"

interface TemplatesButtonProps {
  transcript: { text: string }[];
  hasTranscript: boolean;
  keywords?: string;
}

export default function TemplatesButton({ transcript, hasTranscript, keywords }: TemplatesButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [convertedOutput, setConvertedOutput] = useState("")

  const handleConvertToTemplate = async (templateType: string) => {
    if (!transcript.length) return;
    setIsLoading(true);
    console.log("Converting transcript:", transcript);

    try {
      const transcriptText = transcript;
      const templateContent = mockTemplates.find(t => t.name === templateType)?.content;

      const prompt = `Context/Keywords: ${keywords || 'None provided'}

Convert the following transcript into the specified format. Use ONLY information from the transcript to fill in the placeholders. Do not ask for additional information.

Template Format:
${templateContent}

Transcript:
${transcriptText}

Instructions:
1. Replace all [placeholders] with actual information from the transcript
2. Keep the markdown formatting
3. If specific information is not available in the transcript, use "N/A" or remove that section
4. Do not ask questions - just convert the transcript to the template format`;

      console.log("Sending prompt to Gemini:", prompt);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const formattedOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Sorry, couldn't convert the transcript.";
      
      setConvertedOutput(formattedOutput);
    } catch (error) {
      console.error('Template conversion error:', error);
      setConvertedOutput("Error converting transcript to template format.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="flex items-center gap-2 px-4 py-3 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 border-none"
        onClick={() => setIsOpen(true)}
        disabled={!hasTranscript}
      >
        <FileUp className="h-5 w-5" />
        <span className="text-sm font-medium">Convert to Templates</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
            <DialogTitle>Convert to Templates</DialogTitle>
            <DialogDescription>Choose a template format to convert your transcript into</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {mockTemplates.map((template) => (
              <Button 
                key={template.id}
                onClick={() => handleConvertToTemplate(template.name)}
                disabled={isLoading}
                className="flex flex-col items-start p-6 h-auto text-left space-y-2 hover:bg-muted w-full bg-purple-600"
              >
                <h3 className="font-semibold text-white">{template.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2 w-full">{template.description}</p>
              </Button>
            ))}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Converting transcript...</span>
            </div>
          )}

          {convertedOutput && (
            <div className="mt-4">
              <div className="flex justify-end mb-2">
                <Button 
                  onClick={() => {
                    const blob = new Blob([convertedOutput], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'converted-template.md';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export as Markdown
                </Button>
              </div>
              <ScrollArea className="p-4 border rounded-lg h-[400px]">
                <pre className="whitespace-pre-wrap">{convertedOutput}</pre>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

