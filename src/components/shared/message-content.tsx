import React from 'react'
import { Paperclip } from 'lucide-react'
import Image from 'next/image'
import { IMessage } from '@/types/Chat'

const MessageContent = ({ message }: { message: IMessage }) => {
  if (!message.meta_data && !message.content) return null

  switch (message.type) {
    case 'image':
      return (
        <Image
          width="200"
          height="100"
          src={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
          alt="Image message"
          className="max-w-[200px] rounded-lg"
          loading="lazy"
        />
      )

    case 'video':
      return (
        <video controls className="max-w-[300px] rounded-lg">
          <source
            src={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
          />
        </video>
      )

    case 'file':
      return (
        <a
          href={`${process.env.NEXT_PUBLIC_STORAGE}/${message.meta_data?.file_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary p-2 hover:bg-secondary/80"
        >
          <Paperclip className="size-4" />
          <span className="text-sm">Download file</span>
        </a>
      )

    default:
      return message.text ? <span>{message.text}</span> : null
  }
}

export default MessageContent
