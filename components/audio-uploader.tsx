"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, X } from "lucide-react"

interface AudioUploaderProps {
  audioFile: File | null
  setAudioFile: (file: File | null) => void
  audioUrl: string
  setAudioUrl: (url: string) => void
  compact?: boolean
}

export default function AudioUploader({
  audioFile,
  setAudioFile,
  audioUrl,
  setAudioUrl,
  compact = false,
}: AudioUploaderProps) {
  const [uploadMethod, setUploadMethod] = useState("file")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setAudioFile(files[0])
      setAudioUrl("")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("audio/")) {
        setAudioFile(file)
        setAudioUrl("")
      }
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value)
    setAudioFile(null)
  }

  const clearFile = () => {
    setAudioFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const clearUrl = () => {
    setAudioUrl("")
  }

  return (
    <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="file">
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </TabsTrigger>
        <TabsTrigger value="url">
          <Link className="h-4 w-4 mr-2" />
          Enter URL
        </TabsTrigger>
      </TabsList>

      <TabsContent value="file" className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg ${compact ? "p-4" : "p-8"} text-center transition-all duration-300 ${
            audioFile ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!audioFile ? (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-300 rounded-full blur-md pulse"></div>
                  <Upload className={`${compact ? "h-8 w-8" : "h-12 w-12"} text-purple-700 relative`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drag and drop your audio file here, or click to browse</p>
                {!compact && (
                  <p className="text-xs text-muted-foreground mt-1">Supports MP3, WAV, M4A, and other audio formats</p>
                )}
              </div>
              <Button
                variant="outline"
                size={compact ? "sm" : "default"}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-purple-100 hover:text-purple-700 hover:border-purple-400 transition-colors"
              >
                Select File
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-purple-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">{audioFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="h-8 w-8 hover:bg-purple-100 hover:text-purple-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="url" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="audio-url">Audio URL</Label>
          <div className="flex gap-2">
            <Input
              id="audio-url"
              placeholder="https://example.com/audio-file.mp3"
              value={audioUrl}
              onChange={handleUrlChange}
            />
            {audioUrl && (
              <Button variant="ghost" size="icon" onClick={clearUrl} className="h-10 w-10">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Enter a direct URL to an audio file</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

