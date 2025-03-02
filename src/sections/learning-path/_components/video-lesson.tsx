'use client'

import React, { useEffect, useRef, useState } from 'react'
import MuxPlayerElement from '@mux/mux-player'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { toast } from 'react-toastify'

import { ILesson } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { formatDate, formatDuration } from '@/lib/common'
import {
  useCompleteLesson,
  useUpdateLastTime,
} from '@/hooks/learning-path/useLearningPath'
import { useStoreNote } from '@/hooks/note/useNote'

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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import HtmlRenderer from '@/components/shared/html-renderer'
import QuillEditor from '@/components/shared/quill-editor'

type Props = {
  lesson: ILesson
  isCompleted: boolean
  lastTimeVideo?: number
}

const VideoLesson = ({ lesson, isCompleted, lastTimeVideo = 0 }: Props) => {
  const queryClient = useQueryClient()

  const [currentTime, setCurrentTime] = useState(0)
  const muxPlayerRef = useRef<MuxPlayerElement>(null)
  const isCalled = useRef<boolean>(false)

  const [warningSeeking, setWarningSeeking] = useState(false)
  const [maxWatchableTime, setMaxWatchableTime] = useState(0)
  const [timeBeforeSeeking, setTimeBeforeSeeking] = useState(0)

  const [noteContent, setNoteContent] = useState<string>('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { mutate: completeLesson } = useCompleteLesson()
  const { mutate: updateLastTime, isPending: isLastTimeUpdating } =
    useUpdateLastTime()
  const { mutate: storeNote, isPending: isPendingStoreNote } = useStoreNote()

  const handleTimeUpdate = (e: Event) => {
    const element = e.target as MuxPlayerElement
    setCurrentTime(element.currentTime)
    if (currentTime > maxWatchableTime) {
      setMaxWatchableTime(currentTime)
      return
    }

    if (
      !isCompleted &&
      element.currentTime > (2 / 3) * element.duration &&
      !isCalled.current
    ) {
      isCalled.current = true
      completeLesson(
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

    if (Math.round(element.currentTime) % 30 === 0 && !isLastTimeUpdating) {
      updateLastTime({
        lesson_id: lesson.id!,
        last_time_video: element.currentTime,
      })
    }
  }

  const handleSeeking = (e: Event) => {
    const element = e.target as MuxPlayerElement

    // if (element.currentTime > maxWatchableTime) {
    //   setTimeBeforeSeeking(maxWatchableTime)
    //   element.currentTime = maxWatchableTime
    //   setWarningSeeking(true)
    //
    //   setTimeout(() => {
    //     muxPlayerRef.current?.pause()
    //   }, 100)
    // }
  }

  useEffect(() => {
    const player = muxPlayerRef.current
    if (player) {
      player.addEventListener('timeupdate', handleTimeUpdate)
      player.addEventListener('seeking', handleSeeking)
    }
    return () => {
      if (player) {
        player.removeEventListener('timeupdate', handleTimeUpdate)
        player.removeEventListener('seeking', handleSeeking)
      }
    }
  }, [maxWatchableTime])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        return
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        return
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handlePause = (e: Event) => {
    const element = e.target as MuxPlayerElement
    updateLastTime({
      lesson_id: lesson.id!,
      last_time_video: element.currentTime,
    })
  }

  const handleAddNote = () => {
    if (muxPlayerRef.current) {
      muxPlayerRef.current.pause()
    }
    setIsSheetOpen(true)
  }

  const handleSaveNote = () => {
    if (noteContent.trim() === '') {
      toast.warning('Vui lòng nhập nội dung ghi chú')
      return
    }

    const payload = {
      lesson_id: lesson.id!,
      content: noteContent,
      time: Math.round(currentTime),
    }

    storeNote(payload, {
      onSuccess: async (res: any) => {
        toast.success(res.message)
        setNoteContent('')
        setIsSheetOpen(false)
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.NOTE_LESSON],
        })
      },
      onError: (error: any) => {
        toast.error(error.message)
      },
    })
  }

  const handlePlay = async () => {
    try {
      await muxPlayerRef.current?.play()
    } catch (error) {
      console.warn('Play request interrupted:', error)
    }
  }

  const handleCloseWarning = () => {
    setWarningSeeking(false)
    if (muxPlayerRef.current) {
      muxPlayerRef.current.currentTime = timeBeforeSeeking
      handlePlay()
    }
  }

  return (
    <>
      <div className="bg-black/95 px-16 lg:px-20 xl:px-40">
        <div className="aspect-video">
          <MuxPlayer
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
              Cập nhật vào{' '}
              {formatDate(lesson.updated_at, {
                dateStyle: 'long',
              })}
            </p>
          </div>

          <Button variant="secondary" onClick={handleAddNote}>
            <Plus />
            Thêm ghi chú tại{' '}
            <span className="font-semibold">
              {formatDuration(Math.round(currentTime), 'colon')}
            </span>
          </Button>
        </div>
        <HtmlRenderer html={lesson.content} className="mt-8" />

        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            if (!open) return
          }}
        >
          <SheetContent
            side="right"
            className="max-w-2xl"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <SheetHeader>
              <SheetTitle>Thêm ghi chú trong bài học</SheetTitle>
              <SheetDescription>
                Hãy để lại những ghi chú mã bạn cảm thấy hữu ích khi học tập tại
                đây.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 grid gap-4 py-4">
              <h4 className="font-bold">
                Thêm ghi chú tại{' '}
                <span className="rounded-md bg-gray-100 p-2 font-semibold">
                  {formatDuration(Math.round(currentTime), 'colon')}
                </span>
              </h4>
            </div>
            <div>
              <QuillEditor
                value={noteContent}
                onChange={setNoteContent}
                theme="snow"
              />
            </div>
            <SheetFooter className="mt-4">
              <Button
                onClick={() => {
                  setIsSheetOpen(false)
                  muxPlayerRef.current?.play()
                }}
                type="button"
                variant="outline"
                disabled={isPendingStoreNote}
              >
                Huỷ bỏ
              </Button>
              <Button
                disabled={noteContent.trim() === '' || isPendingStoreNote}
                onClick={handleSaveNote}
                type="submit"
              >
                {isPendingStoreNote ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Loading..
                  </>
                ) : (
                  'Tạo ghi chú'
                )}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {warningSeeking && (
        <AlertDialog
          open={warningSeeking}
          onOpenChange={(open) => {
            setWarningSeeking(open)
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Cảnh báo: Bạn đang học quá nhanh
              </AlertDialogTitle>
              <AlertDialogDescription>
                Để đảm bảo chất lượng học tập, vui lòng không tua video. Hãy xem
                các nội dung trước để hiểu rõ hơn bài giảng.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={handleCloseWarning}
                className="font-semibold"
              >
                Đã hiểu
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

export default VideoLesson
