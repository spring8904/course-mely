import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Loader2, Plus, Trash2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  ACCEPTED_FILE_TYPES,
  certificatesProfileSchema,
  MAX_FILE_SIZE,
  UpdateCertificatesProfilePayload,
} from '@/validations/profile'
import { useUpdateCertificatesProfile } from '@/hooks/profile/useProfile'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

interface Props {
  certificateData: any
  isEditing: boolean
  setIsEditing: (value: boolean) => void
}

export function CertificateSection({
  certificateData,
  isEditing,
  setIsEditing,
}: Props) {
  const { mutate, isPending } = useUpdateCertificatesProfile()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [existingCertificates, setExistingCertificates] = useState<string[]>([])
  const [removedCertificates, setRemovedCertificates] = useState<string[]>([])

  const form = useForm<UpdateCertificatesProfilePayload>({
    resolver: zodResolver(certificatesProfileSchema),
    defaultValues: {
      certificates: [],
      existingCertificates: [],
    },
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
    console.log('Raw certificateData:', certificateData)
    const certificates = parseCertificates(certificateData)
    console.log('Parsed certificates:', certificates)

    if (certificates.length > 0) {
      setExistingCertificates(certificates)
      form.setValue('existingCertificates', certificates)
    }
    setRemovedCertificates([])
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

  const removeNewFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    form.setValue('certificates', newFiles)
  }

  const removeExistingCertificate = (cert: string) => {
    setRemovedCertificates((prev) => [...prev, cert])
    const newCertificates = existingCertificates.filter((c) => c !== cert)
    setExistingCertificates(newCertificates)
    form.setValue('existingCertificates', newCertificates)
  }

  const restoreExistingCertificate = (cert: string) => {
    setRemovedCertificates((prev) => prev.filter((c) => c !== cert))
    setExistingCertificates((prev) => [...prev, cert])
    form.setValue('existingCertificates', [...existingCertificates, cert])
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
        setRemovedCertificates([])
      },
    })
  }

  const getFileName = (url: string): string => {
    try {
      const fileName = url.split('/').pop() || ''
      return fileName.split('?')[0]
    } catch {
      return 'certificate'
    }
  }

  const getFileExtension = (url: string): string => {
    try {
      const fileName = getFileName(url)
      return fileName.split('.').pop()?.toLowerCase() || ''
    } catch {
      return ''
    }
  }

  const getFileIcon = (url: string) => {
    const ext = getFileExtension(url)
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return (
        <Image
          src={url}
          alt={'Certificate preview'}
          className="size-16 rounded object-cover"
          width={40}
          height={40}
        />
      )
    }
    return <FileText className="size-6 text-gray-500" />
  }

  const renderCertificates = () => {
    if (!isEditing) {
      return existingCertificates.length > 0 ? (
        <div>
          <h4 className="mb-2 text-sm font-medium">Danh sách chứng chỉ</h4>
          <div className="space-y-2">
            {existingCertificates.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                {getFileIcon(cert)}
                <a
                  href={cert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {getFileName(cert)}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-4 text-center text-gray-500">
          Chưa có chứng chỉ nào được thêm vào
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Chứng chỉ</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.multiple = true
              input.accept = ACCEPTED_FILE_TYPES.join(',')
              input.onchange = (e) => handleFileChange(e as any)
              input.click()
            }}
          >
            <Plus className="mr-2 size-4" />
            Thêm chứng chỉ
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            {existingCertificates.map((cert) => (
              <div
                key={cert}
                className="flex items-center justify-between rounded-md border bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(cert)}
                  <a
                    href={cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {getFileName(cert)}
                  </a>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExistingCertificate(cert)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            {removedCertificates.length > 0 && (
              <div className="mt-4 space-y-2 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Giấy chứng chỉ đã xóa
                </h4>
                {removedCertificates.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center justify-between rounded-md border border-dashed bg-gray-50/50 p-3"
                  >
                    <div className="flex items-center gap-3 text-gray-500">
                      {getFileIcon(cert)}
                      <span className="line-through">{getFileName(cert)}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => restoreExistingCertificate(cert)}
                      className="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Khôi phục
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2 border-t pt-4">
                <h4 className="text-sm font-medium text-blue-500">
                  Chứng chỉ mới
                </h4>
                {selectedFiles.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="flex items-center justify-between rounded-md border bg-blue-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-6 text-blue-500" />
                      <span className="text-sm text-blue-700">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNewFile(index)}
                      className="text-blue-500 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {existingCertificates.length === 0 &&
              removedCertificates.length === 0 &&
              selectedFiles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <FileText className="mb-2 size-12" />
                  <p className="text-center">
                    Chưa có chứng chỉ nào được thêm vào
                    <br />
                    Nhấp vào Thêm chứng chỉ để tải lên.
                  </p>
                </div>
              )}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Các định dạng được chấp nhận: JPG, JPEG, PNG, WEBP, PDF (tối đa 5MB)
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin nghề nghiệp</h3>
                {renderCertificates()}
              </div>

              <div className="flex gap-2 pt-6">
                <Button type="submit">
                  {isPending && <Loader2 className="animate-spin" />} Lưu tất cả
                  thay đổi
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedFiles([])
                    const certificates = parseCertificates(certificateData)
                    setExistingCertificates(certificates)
                    setRemovedCertificates([])
                  }}
                >
                  Quay lại
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-4 rounded-lg border p-4">
                  {renderCertificates()}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="w-full"
              >
                Cập nhật chứng chỉ
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
