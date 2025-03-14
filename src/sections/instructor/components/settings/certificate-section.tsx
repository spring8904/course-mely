import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FileText,
  Loader2,
  Plus,
  X,
  Upload,
  Award,
  ChevronRight,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

import {
  ACCEPTED_FILE_TYPES,
  certificatesProfileSchema,
  MAX_FILE_SIZE,
  UpdateCertificatesProfilePayload,
} from '@/validations/profile'
import { useUpdateCertificatesProfile } from '@/hooks/profile/useProfile'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  certificateData: any
}

export function CertificateSection({ certificateData }: Props) {
  const { mutate, isPending } = useUpdateCertificatesProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [existingCertificates, setExistingCertificates] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)

  const form = useForm<UpdateCertificatesProfilePayload>({
    resolver: zodResolver(certificatesProfileSchema),
    defaultValues: {
      certificates: [],
      existingCertificates: [],
    },
    disabled: isPending,
  })

  const parseCertificates = (certificatesData: any): string[] => {
    try {
      if (!certificatesData) return []

      if (Array.isArray(certificatesData)) {
        return certificatesData
      }

      if (typeof certificatesData === 'string') {
        const parsed = JSON.parse(certificatesData)
        return Array.isArray(parsed) ? parsed : []
      }

      if (certificatesData.certificates) {
        const certs = certificatesData.certificates
        if (Array.isArray(certs)) return certs
        if (typeof certs === 'string') {
          const parsed = JSON.parse(certs)
          return Array.isArray(parsed) ? parsed : []
        }
      }

      return []
    } catch (err) {
      console.error('Error parsing certificates:', err)
      return []
    }
  }

  useEffect(() => {
    const certificates = parseCertificates(certificateData)
    if (certificates.length > 0) {
      setExistingCertificates(certificates)
      form.setValue('existingCertificates', certificates)
    }
  }, [certificateData, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(
      (file) =>
        file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
    )
    setSelectedFiles((prev) => [...prev, ...validFiles])
    form.setValue('certificates', [...selectedFiles, ...validFiles])
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(
      (file) =>
        file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
    )
    setSelectedFiles((prev) => [...prev, ...validFiles])
    form.setValue('certificates', [...selectedFiles, ...validFiles])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const removeNewFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    form.setValue('certificates', newFiles)
  }

  function onSubmit(data: UpdateCertificatesProfilePayload) {
    const formData = {
      ...data,
      certificates: selectedFiles,
      existingCertificates: existingCertificates,
    }
    mutate(formData, {
      onSuccess: () => {
        setIsEditing(false)
        setSelectedFiles([])
      },
    })
  }

  const getFileName = (url: string): string => {
    try {
      const fullUrl = `${process.env.NEXT_PUBLIC_STORAGE}/${url}`
      return fullUrl.split('/').pop()?.split('?')[0] || 'certificate'
    } catch {
      return 'certificate'
    }
  }

  const getFileExtension = (url: string): string => {
    try {
      const fullUrl = `${process.env.NEXT_PUBLIC_STORAGE}/${url}`
      const fileName = fullUrl.split('/').pop() || ''
      return fileName.split('.').pop()?.toLowerCase() || ''
    } catch {
      return ''
    }
  }

  const getFileIcon = (url: string) => {
    const ext = getFileExtension(url)
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      const fullUrl = `${process.env.NEXT_PUBLIC_STORAGE}/${url}`

      return (
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={fullUrl}
            alt={'Certificate preview'}
            className="aspect-[3/2] w-full object-cover transition-transform hover:scale-105"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )
    }
    return (
      <div className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-primary/5">
        <FileText className="size-12 text-primary" />
      </div>
    )
  }

  const renderCertificates = () => {
    if (!isEditing) {
      return existingCertificates.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Award className="size-5" />
            <h4 className="text-lg font-semibold">Chứng chỉ đã tải lên</h4>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {existingCertificates.map((cert) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                key={cert}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                {getFileIcon(cert)}
                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="line-clamp-1 font-medium text-gray-900">
                      {getFileName(cert)}
                    </h5>
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-xs font-normal"
                    >
                      {getFileExtension(cert).toUpperCase()}
                    </Badge>
                  </div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_STORAGE}/${cert}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Xem chi tiết
                    <ChevronRight className="size-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-16"
        >
          <Award className="mb-4 size-16 text-gray-300" />
          <p className="text-center text-gray-500">
            Chưa có chứng chỉ nào được tải lên
          </p>
        </motion.div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Quản lý chứng chỉ
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tải lên các chứng chỉ, bằng cấp và giấy tờ quan trọng của bạn
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.multiple = true
              input.accept = ACCEPTED_FILE_TYPES.join(',')
              input.onchange = (e) => handleFileChange(e as any)
              input.click()
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 size-4" />
            Thêm chứng chỉ
          </Button>
        </div>

        <Card className="overflow-hidden border-none bg-white/50 shadow-md backdrop-blur-sm">
          <CardContent className="p-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative mb-6 rounded-lg border-2 border-dashed p-6 transition-all ${
                dragActive
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="mb-3 size-12 text-primary/60" />
                <h4 className="mb-1.5 text-base font-medium text-gray-900">
                  Kéo và thả tệp vào đây
                </h4>
                <p className="mb-3 text-sm text-gray-500">
                  hoặc nhấp vào nút Thêm chứng chỉ để tải lên
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {ACCEPTED_FILE_TYPES.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {type.split('/')[1].toUpperCase()}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="text-xs font-normal">
                    Tối đa 5MB
                  </Badge>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {existingCertificates.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-gray-900">
                    <Award className="size-5 text-primary" />
                    Chứng chỉ hiện có
                  </h4>
                  <div className="divide-y rounded-lg border bg-gray-50">
                    {existingCertificates.map((cert) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        key={cert}
                        className="group flex items-center gap-4 p-3 hover:bg-gray-100"
                      >
                        <div className="shrink-0">
                          <FileText className="size-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <a
                            href={`${process.env.NEXT_PUBLIC_STORAGE}/${cert}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 hover:text-primary"
                          >
                            {getFileName(cert)}
                          </a>
                          <Badge variant="secondary" className="text-xs">
                            {getFileExtension(cert).toUpperCase()}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-gray-900">
                    <Upload className="size-5 text-primary" />
                    Chứng chỉ mới
                  </h4>
                  <div className="divide-y rounded-lg border bg-primary/5">
                    {selectedFiles.map((file, index) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        key={`new-${index}`}
                        className="flex items-center justify-between p-3"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="size-8 text-primary" />
                          <span className="font-medium text-primary">
                            {file.name}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNewFile(index)}
                          className="text-primary hover:bg-primary/10"
                        >
                          <X className="size-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-4 mt-8 max-w-4xl space-y-6 pb-16 lg:mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {isEditing ? (
            <>
              {renderCertificates()}
              <div className="flex gap-3 border-t pt-6">
                <Button
                  type="submit"
                  className="min-w-[140px] bg-primary hover:bg-primary/90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </Button>
                <Button
                  disabled={isPending}
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedFiles([])
                    const certificates = parseCertificates(certificateData)
                    setExistingCertificates(certificates)
                  }}
                >
                  Quay lại
                </Button>
              </div>
            </>
          ) : (
            <Card className="overflow-hidden border bg-white/50 shadow-md backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gray-50/50 px-6 py-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Award className="size-5 text-primary" />
                    Chứng chỉ & Giấy tờ
                  </CardTitle>
                  <p className="mt-1 text-sm text-gray-500">
                    Quản lý các chứng chỉ và giấy tờ quan trọng của bạn
                  </p>
                </div>
                <Button disabled={isPending} onClick={() => setIsEditing(true)}>
                  Cập nhật
                </Button>
              </CardHeader>
              <CardContent className="px-6 py-4">
                {renderCertificates()}
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  )
}
