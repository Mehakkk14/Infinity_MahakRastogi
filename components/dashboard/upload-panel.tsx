"use client"

import * as React from "react"
import { Upload, FileText, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface UploadPanelProps {
  documentText: string
  setDocumentText: (text: string) => void
  onAnalyze: () => void
  onReset: () => void
  isAnalyzing: boolean
  hasResults: boolean
}

export function UploadPanel({
  documentText,
  setDocumentText,
  onAnalyze,
  onReset,
  isAnalyzing,
  hasResults,
}: UploadPanelProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadedFileName, setUploadedFileName] = React.useState<string>("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    setIsUploading(true)
    setUploadedFileName(file.name)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      setDocumentText(result.text)
    } catch (error) {
      console.error('File upload error:', error)
      setUploadedFileName('')
      alert('Failed to upload file. Please try pasting the text directly.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Upload Document
        </CardTitle>
        <CardDescription>
          Upload your legal document or paste the text directly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Text</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-0">
            <div
              className={cn(
                "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200",
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
                isUploading && "opacity-50 cursor-not-allowed"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={!isUploading ? handleFileSelect : undefined}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInputChange}
                disabled={isUploading}
              />
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  {isUploading ? (
                    <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : uploadedFileName ? (
                    <FileText className="h-8 w-8 text-success" />
                  ) : (
                    <Upload className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isUploading ? "Uploading..." : uploadedFileName ? `File: ${uploadedFileName}` : "Drop your document here"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isUploading ? "Processing file..." : uploadedFileName ? "Ready for analysis" : "or click to browse (PDF, DOC, TXT)"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="mt-0">
            <Textarea
              placeholder="Paste your contract or legal document text here..."
              className="min-h-[200px] resize-none border-border/50 bg-muted/30 focus:border-primary/50"
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
            />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            className="flex-1"
            size="lg"
            onClick={onAnalyze}
            disabled={!documentText.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </>
            ) : (
              "Analyze Document"
            )}
          </Button>
          {hasResults && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onReset()
                setUploadedFileName("")
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
