'use client'

import * as React from 'react'
import { useEdgeStore } from '@/lib/edgestore'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X } from 'lucide-react'

interface UploadResponse {
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
}

interface UploadComponentProps {
  onUploadComplete: (res:UploadResponse) => void
}

export default function UploadComponent({onUploadComplete}:UploadComponentProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [dragActive, setDragActive] = React.useState(false)
  const { edgestore } = useEdgeStore()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  const uploadFile = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress)
          },
        })
        console.log(res)
        // you can run some server action or api here
        // to add the necessary data to your database
        onUploadComplete(res)
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Upload failed. Please try again.')
      } finally {
        setProgress(0)
        setFile(null)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*,application/pdf"
        />
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="w-8 h-8 text-primary mr-2" />
              <span className="text-sm text-gray-500">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setFile(null)
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500">
              Drag & drop a file here, or click to select a file
            </p>
          </div>
        )}
      </div>
      {progress > 0 && (
        <Progress value={progress} className="mt-4" />
      )}
      <Button
        className="w-full mt-4"
        onClick={uploadFile}
        disabled={!file || progress > 0}
      >
        {progress > 0 ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  )
}