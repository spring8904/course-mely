import React, { useState } from 'react'
import { FileUp, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { useImportQuestion } from '@/hooks/instructor/quiz/useQuiz'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ImportQuestionProps {
  quizId: string
  isOpenImportQuestion: boolean
  setIsOpenImportQuestion: (open: boolean) => void
}

const ImportQuestion: React.FC<ImportQuestionProps> = ({
  quizId,
  setIsOpenImportQuestion,
  isOpenImportQuestion,
}) => {
  console.log(quizId)

  const [file, setFile] = useState<File | null>(null)
  const { mutate: importMutation, isPending } = useImportQuestion()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls', '.csv'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
      }
    },
  })

  const handleImport = () => {
    if (!file) {
      toast.error('Vui lòng chọn một file để import!')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    importMutation(
      { quizId, data: formData },
      {
        onSuccess: () => {
          setIsOpenImportQuestion(false)
          setFile(null)
        },
      }
    )
  }

  return (
    <Dialog open={isOpenImportQuestion} onOpenChange={setIsOpenImportQuestion}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import câu hỏi</DialogTitle>
          <DialogDescription>
            Chọn tệp CSV để import câu hỏi vào hệ thống.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
          <div
            {...getRootProps()}
            className={`cursor-pointer p-6 text-center ${isDragActive ? 'bg-gray-100' : ''}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="font-medium text-green-600">📂 {file.name}</p>
            ) : isDragActive ? (
              <p className="text-blue-600">Thả file vào đây...</p>
            ) : (
              <p className="text-gray-500">
                Kéo & Thả file hoặc click để chọn file
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleImport}
              disabled={!file || isPending}
              className="flex items-center gap-2 bg-primary px-4 py-2 text-white hover:bg-orange-500"
            >
              {isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <FileUp className="size-5" />
              )}
              Tải lên
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportQuestion
