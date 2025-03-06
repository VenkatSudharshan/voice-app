"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mic, FileText, Download, ListChecks } from "lucide-react"
import AudioUploader from "@/components/audio-uploader"
import TranscriptView from "@/components/transcript-view"
import SummaryView from "@/components/summary-view"
import ActionItemsView from "@/components/action-items-view"
import ChatbotButton from "@/components/chatbot-button"
import TemplatesButton from "@/components/templates-button"

export default function VoiceTranscriber() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState("")
  const [keywords, setKeywords] = useState("")
  const [hasTranscript, setHasTranscript] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!audioFile && !audioUrl) {
      toast({
        title: "Input required",
        description: "Please upload an audio file or provide a URL",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setHasTranscript(true)
      toast({
        title: "Processing complete",
        description: "Your audio has been successfully transcribed",
      })
    }, 3000)
  }

  const resetForm = () => {
    setAudioFile(null)
    setAudioUrl("")
    setKeywords("")
    setHasTranscript(false)
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Voice Transcriber
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Upload audio, get transcripts, summaries, and more</p>
      </div>

      {/* Upload Section - Smaller at the top */}
      <Card className="mb-8 shadow-lg border-2 border-purple-200 overflow-hidden bg-white">
        <CardContent className="pt-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AudioUploader
                audioFile={audioFile}
                setAudioFile={setAudioFile}
                audioUrl={audioUrl}
                setAudioUrl={setAudioUrl}
                compact={true}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords/Context (Optional)</Label>
                <Textarea
                  id="keywords"
                  placeholder="Enter keywords or context"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="resize-none h-20"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full fancy-button bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Transcribe Audio
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="relative">
        {/* Three-column layout for transcript, summary, and action items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="h-[600px] flex flex-col shadow-lg border-2 border-purple-200 overflow-hidden bg-white">
            <CardHeader className="pb-2 bg-gradient-to-r from-purple-100 to-white">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Transcript</span>
                <Button variant="outline" size="sm" disabled={!hasTranscript}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {hasTranscript ? (
                <TranscriptView />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-24 h-24 mb-6 relative floating">
                    <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-300 to-blue-300 rounded-full">
                      <FileText className="h-12 w-12 text-purple-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-purple-700">No Transcript Yet</h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Transcribe audio to see speaker-by-speaker transcript here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="h-[600px] flex flex-col shadow-lg border-2 border-blue-200 overflow-hidden bg-white">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-100 to-white">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Summary</span>
                <Button variant="outline" size="sm" disabled={!hasTranscript}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {hasTranscript ? (
                <SummaryView />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-24 h-24 mb-6 relative floating">
                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-300 to-purple-300 rounded-full">
                      <FileText className="h-12 w-12 text-blue-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-blue-700">No Summary Yet</h3>
                  <p className="text-sm text-gray-500 max-w-xs">Transcribe audio to see an AI-generated summary here</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="h-[600px] flex flex-col shadow-lg border-2 border-indigo-200 overflow-hidden bg-white">
            <CardHeader className="pb-2 bg-gradient-to-r from-indigo-100 to-white">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Action Items</span>
                <Button variant="outline" size="sm" disabled={!hasTranscript}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {hasTranscript ? (
                <ActionItemsView />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-24 h-24 mb-6 relative floating">
                    <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full">
                      <ListChecks className="h-12 w-12 text-indigo-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-indigo-700">No Action Items Yet</h3>
                  <p className="text-sm text-gray-500 max-w-xs">Transcribe audio to see extracted action items here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Floating Chatbot Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <ChatbotButton />
        </div>

        {/* Templates Button - Repositioned to bottom left */}
        <div className="fixed bottom-6 left-6 z-40">
          <TemplatesButton />
        </div>
      </div>
    </div>
  )
}

