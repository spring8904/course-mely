import React from 'react'
import { Download, FileText, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import { IMessage } from '@/types/Chat'

const MessageContent = ({ message }: { message: IMessage }) => {
  if (!message.meta_data && !message.content) return null

  switch (message.type) {
    case 'image':
      return (
        <div className="group relative">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              width={300}
              height={200}
              src={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
              alt="Image message"
              className="max-w-[300px] rounded-lg object-cover transition-transform duration-200 hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <a
                href={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-white"
              >
                <Download className="size-4" />
                Tải xuống
              </a>
            </div>
          </div>
        </div>
      )

    case 'video':
      return (
        <div className="group relative max-w-[350px] overflow-hidden rounded-lg bg-black/5 shadow-sm">
          <div className="relative aspect-video">
            <video
              className="size-full object-cover"
              poster={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.thumbnail}`}
            >
              <source
                src={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <PlayCircle className="size-12 text-white/90 transition-transform duration-200 group-hover:scale-110" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <span className="text-sm text-gray-600">Video</span>
            <a
              href={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
              download
              className="rounded-full bg-white/90 p-1.5 text-gray-600 hover:bg-white hover:text-gray-900"
            >
              <Download className="size-4" />
            </a>
          </div>
        </div>
      )

    case 'file':
      return (
        <div className="group max-w-[300px] overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">
                {message.meta_data?.file_name || 'File đính kèm'}
              </p>
              <p className="text-xs text-gray-500">
                {message.meta_data?.file_size
                  ? `${(message.meta_data.file_size / 1024 / 1024).toFixed(2)} MB`
                  : 'Unknown size'}
              </p>
            </div>
            <a
              href={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
              download
              className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Download className="size-4" />
            </a>
          </div>
        </div>
      )

    default:
      return message.text ? (
        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
      ) : null
  }
}

export default MessageContent
