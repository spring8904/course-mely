'use client'

import HtmlRenderer from '@/components/shared/html-renderer'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  useCompleteLesson,
  useUpdateLastTime,
} from '@/hooks/learning-path/useLearningPath'
import { formatDate, formatDuration } from '@/lib/common'
import { ILesson } from '@/types'
import MuxPlayerElement from '@mux/mux-player'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import AddNoteSheet from './add-note-sheet'

type Props = {
  lesson: ILesson
  isCompleted: boolean
  lastTimeVideo?: number
}

const VideoLesson = ({ lesson, isCompleted, lastTimeVideo = 0 }: Props) => {
  const muxPlayerRef = useRef<MuxPlayerElement>(null)
  const isCalled = useRef<boolean>(false)
  const [currentTime, setCurrentTime] = useState(lastTimeVideo)
  const [watchedTime, setWatchedTime] = useState(lastTimeVideo)

  const [openWarningSeeking, setOpenWarningSeeking] = useState(false)
  const [openAddNote, setOpenAddNote] = useState(false)

  const { mutate: completeLesson } = useCompleteLesson()
  const { mutate: updateLastTime, isPending: isLastTimeUpdating } =
    useUpdateLastTime()

  const handleTimeUpdate = (e: Event) => {
    const muxPlayer = e.target as MuxPlayerElement

    if (muxPlayer.currentTime > watchedTime + 30) {
      muxPlayerRef.current?.pause()
      if (muxPlayerRef.current) {
        muxPlayerRef.current.currentTime = currentTime
      }
      setOpenWarningSeeking(true)
      return
    }

    const roundedCurrentTime = Math.round(muxPlayer.currentTime)
    const duration = muxPlayer.duration

    setCurrentTime(roundedCurrentTime)

    if (roundedCurrentTime > watchedTime) {
      setWatchedTime(roundedCurrentTime)
    }

    if (
      !isCompleted &&
      roundedCurrentTime > (2 / 3) * duration &&
      !isCalled.current
    ) {
      isCalled.current = true
      completeLesson(
        {
          lesson_id: lesson.id!,
          current_time: roundedCurrentTime,
        },
        {
          onError: () => {
            isCalled.current = false
          },
        }
      )
    }

    if (
      roundedCurrentTime !== 0 &&
      roundedCurrentTime % 30 === 0 &&
      !isLastTimeUpdating
    ) {
      updateLastTime({
        lesson_id: lesson.id!,
        last_time_video: roundedCurrentTime,
      })
    }
  }

  const handlePause = () => {
    updateLastTime({
      lesson_id: lesson.id!,
      last_time_video: currentTime,
    })
  }

  return (
    <>
      <div className="bg-black/95 px-16 lg:px-20 xl:px-40">
        <div className="aspect-video">
          <MuxPlayer
            hotkeys="noarrowright"
            ref={muxPlayerRef}
            playbackId={lesson.lessonable?.mux_playback_id}
            accentColor={'hsl(var(--primary))'}
            className="h-full"
            startTime={lastTimeVideo}
            onTimeUpdate={handleTimeUpdate}
            onPause={handlePause}
            style={
              {
                '--seek-forward-button': 'none',
                '--playback-rate-button': 'none',
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <div className="mx-16 mb-40 mt-8">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Cập nhật{' '}
              {formatDate(lesson.updated_at, {
                dateStyle: 'long',
              })}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              muxPlayerRef.current?.pause()
              setOpenAddNote(true)
            }}
          >
            <Plus />
            Thêm ghi chú tại{' '}
            <span className="font-semibold">
              {formatDuration(currentTime, 'colon')}
            </span>
          </Button>
        </div>
        <HtmlRenderer html={lesson.content} className="mt-8" />
      </div>

      <AddNoteSheet
        open={openAddNote}
        onOpenChange={(open) => {
          setOpenAddNote(open)

          if (open) {
            muxPlayerRef.current?.pause()
          } else {
            muxPlayerRef.current?.play()
          }
        }}
        lessonId={lesson.id!}
        currentTime={currentTime}
      />

      <AlertDialog
        open={openWarningSeeking}
        onOpenChange={setOpenWarningSeeking}
      >
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Cảnh báo</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đang học nhanh hơn bình thường, vui lòng không tua quá nhiều
              khi học!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => muxPlayerRef.current?.play()}>
              Đã hiểu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default VideoLesson
