'use client'

import { useState } from 'react'
import MuxPlayerElement from '@mux/mux-player'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { Plus } from 'lucide-react'

import { ILesson } from '@/types'
import { formatDate, formatDuration } from '@/lib/common'

import { Button } from '@/components/ui/button'
import HtmlRenderer from '@/components/shared/html-renderer'

type Props = {
  lesson: ILesson
}

const VideoLesson = ({ lesson }: Props) => {
  const [currentTime, setCurrentTime] = useState(0)

  return (
    <>
      <div className="bg-black/95 px-16 lg:px-20 xl:px-40">
        <div className="aspect-video">
          <MuxPlayer
            playbackId={lesson.lessonable?.mux_playback_id}
            accentColor={'hsl(var(--primary))'}
            className="h-full"
            onTimeUpdate={(e) => {
              setCurrentTime((e.target as MuxPlayerElement)?.currentTime)
            }}
          />
        </div>
      </div>

      <div className="mx-16 mb-40 mt-8">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
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
            <span className="font-semibold">
              {formatDuration(Math.round(currentTime), 'colon')}
            </span>
          </Button>
        </div>

        <HtmlRenderer html={lesson.content} className="mt-8" />
      </div>
    </>
  )
}

export default VideoLesson
