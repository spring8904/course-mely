'use client'

import { useRef } from 'react'
import MuxPlayerElement from '@mux/mux-player'
import MuxPlayer from '@mux/mux-player-react'
import { Plus } from 'lucide-react'

import { ILesson } from '@/types'
import { formatDate, formatDuration } from '@/lib/common'

import { Button } from '@/components/ui/button'
import HtmlRenderer from '@/components/shared/html-renderer'

type Props = {
  lesson: ILesson
}

export const VideoPlayer = ({ lesson }: Props) => {
  const muxPlayerRef = useRef<MuxPlayerElement>(null)

  return (
    <>
      <div className="bg-black/95 px-16 lg:px-20 xl:px-24">
        <div className="aspect-video">
          <MuxPlayer
            ref={muxPlayerRef}
            playbackId={lesson.lessonable?.mux_playback_id}
            accentColor={'hsl(var(--primary))'}
            className="h-full"
          />
        </div>
      </div>

      <div className="mx-16 mb-40 mt-12">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Cập nhật vào{' '}
              {formatDate(lesson.updated_at, {
                dateStyle: 'long',
              })}
            </p>
          </div>

          <Button variant="secondary">
            <Plus />
            Thêm ghi chú tại{' '}
            <span className="font-semibold">{formatDuration(0, 'colon')}</span>
          </Button>
        </div>

        <HtmlRenderer html={lesson.content} className="mt-8" />
      </div>
    </>
  )
}
