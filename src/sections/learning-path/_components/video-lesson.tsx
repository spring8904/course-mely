'use client'

import { useRef, useState } from 'react'
import MuxPlayerElement from '@mux/mux-player'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { Plus } from 'lucide-react'

import { ILesson } from '@/types'
import { formatDate, formatDuration } from '@/lib/common'
import { useCompleteLesson } from '@/hooks/learning-path/useLearningPath'

import { Button } from '@/components/ui/button'
import HtmlRenderer from '@/components/shared/html-renderer'

type Props = {
  lesson: ILesson
  isCompleted: boolean
  lastTimeVideo?: number
}

const VideoLesson = ({ lesson, isCompleted, lastTimeVideo = 0 }: Props) => {
  const [currentTime, setCurrentTime] = useState(0)
  const isCalled = useRef<boolean>(false)

  const { mutate } = useCompleteLesson()

  return (
    <>
      <div className="bg-black/95 px-16 lg:px-20 xl:px-40">
        <div className="aspect-video">
          <MuxPlayer
            playbackId={lesson.lessonable?.mux_playback_id}
            accentColor={'hsl(var(--primary))'}
            className="h-full"
            currentTime={lastTimeVideo}
            onTimeUpdate={(e) => {
              const element = e.target as MuxPlayerElement
              setCurrentTime(element?.currentTime)

              if (
                !isCompleted &&
                element.currentTime > (2 / 3) * element.duration &&
                !isCalled.current
              ) {
                isCalled.current = true
                mutate(
                  {
                    lesson_id: lesson.id!,
                    current_time: element.currentTime,
                  },
                  {
                    onError: () => {
                      isCalled.current = false
                    },
                  }
                )
              }
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
