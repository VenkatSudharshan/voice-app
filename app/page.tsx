import { Suspense } from "react"
import VoiceTranscriber from "@/components/voice-transcriber"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <VoiceTranscriber />
      </Suspense>
      <Toaster />
    </main>
  )
}

