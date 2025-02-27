'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
  Notebook,
} from 'lucide-react'

import { LearningPathLesson } from '@/types'
import { lessonTypeIcons } from '@/configs'
import { formatDuration } from '@/lib/common'
import { cn } from '@/lib/utils'
import {
  useGetLessonDetail,
  useGetLessons,
} from '@/hooks/learning-path/useLearningPath'
import { useGetProgress } from '@/hooks/user/useUser'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import LearningProcess from '@/components/common/LearningProcess'
import ModalLoading from '@/components/common/ModalLoading'
import CommentLesson from '@/sections/learning-path/_components/comment-lesson'
import LessonContent from '@/sections/learning-path/_components/lesson-content'

type Props = {
  courseSlug: string
  lessonId: string
}

const LearningPathView = ({ courseSlug, lessonId }: Props) => {
  const router = useRouter()

  const { data: lessons, isLoading: isLessonLoading } =
    useGetLessons(courseSlug)
  const { chapter_lessons, course_name, total_lesson } = lessons || {}

  const { data: lessonDetail, isLoading: isLessonDetailLoading } =
    useGetLessonDetail(courseSlug, lessonId)

  const { data: progress } = useGetProgress(courseSlug)

  const getLessonDuration = (lesson: LearningPathLesson) => {
    switch (lesson.type) {
      case 'video':
        return lesson.lessonable?.duration as number
      default:
        return 10
    }
  }

  const getChapterProgress = (lessons: LearningPathLesson[]) => {
    return lessons.reduce((acc, lesson) => {
      return acc + (lesson.is_completed ? 1 : 0)
    }, 0)
  }

  const courseProgress = useMemo(
    () =>
      chapter_lessons?.reduce((acc, chapter) => {
        return acc + getChapterProgress(chapter.lessons)
      }, 0),
    [chapter_lessons]
  )

  if (isLessonLoading || isLessonDetailLoading) return <ModalLoading />

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-0 z-10 h-16 bg-[#292f3b]">
        <div className="container mx-auto flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <ChevronLeft className="text-white" />
            </Link>
            <Image src="/images/Logo.png" alt="logo" width={36} height={36} />
            <p className="font-bold text-white">{course_name}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <LearningProcess value={progress ?? 0} />
              <span className="text-sm text-white">
                <span className="font-bold">
                  {courseProgress}/{total_lesson}
                </span>{' '}
                bài học
              </span>
            </div>
            <div className="flex cursor-pointer items-center gap-1 opacity-75 hover:opacity-100">
              <Notebook size={18} className="text-white" />
              <span className="text-sm font-normal text-white">Ghi chú</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 inset-y-16 grid grid-cols-12 overflow-hidden">
        <div className="col-span-9 overflow-y-auto">
          {lessonDetail && <LessonContent lesson={lessonDetail.lesson} />}
        </div>

        <div className="col-span-3 overflow-y-auto">
          <div className="border-l p-4 font-semibold">
            <h2 className="font-bold">Nội dung khoá học</h2>
          </div>

          <Accordion
            type="multiple"
            defaultValue={[`chapter-${lessonDetail?.lesson?.chapter_id}`]}
          >
            {chapter_lessons?.map((chapter, chapterIndex) => {
              return (
                <AccordionItem
                  key={chapterIndex}
                  value={`chapter-${chapter.chapter_id}`}
                >
                  <AccordionTrigger className="hover:bg-gray-200">
                    <div>
                      <h3 className="font-semibold">
                        {chapterIndex + 1}. {chapter.chapter_title}
                      </h3>
                      <p className="mt-1 text-xs font-light">
                        {getChapterProgress(chapter.lessons)}/
                        {chapter?.lessons.length} |{' '}
                        {formatDuration(
                          chapter.total_chapter_duration,
                          'colon'
                        )}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="m-0 p-0">
                    {chapter?.lessons?.map((lesson, lessonIndex) => {
                      const isSelected = lesson?.id === lessonDetail?.lesson?.id
                      return (
                        <div
                          onClick={() => {
                            if (lesson.is_unlocked)
                              router.push(
                                `/learning/${courseSlug}/lesson/${lesson?.id}`
                              )
                          }}
                          className={cn(
                            `flex cursor-default items-center space-x-3 border-b p-3 pr-4 transition-colors duration-300`,
                            isSelected
                              ? 'bg-orange-100'
                              : lesson.is_unlocked
                                ? 'hover:cursor-pointer hover:bg-gray-200'
                                : 'bg-muted'
                          )}
                          key={lessonIndex}
                        >
                          <div className="ml-2 w-full flex-1 space-y-1">
                            <h4>
                              {chapterIndex + 1}.{lessonIndex + 1}{' '}
                              {lesson?.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs font-light [&_svg]:size-3">
                              {lessonTypeIcons[lesson?.type]}{' '}
                              {formatDuration(
                                getLessonDuration(lesson),
                                'colon'
                              )}
                            </div>
                          </div>

                          <div className="size-5 *:size-full">
                            {!lesson.is_unlocked ? (
                              <Lock className="text-muted-foreground" />
                            ) : lesson.is_completed ? (
                              <CheckCircle className="text-green-500" />
                            ) : null}
                          </div>
                        </div>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 h-16 bg-accent">
        <div className="container mx-auto flex h-full items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary font-semibold text-primary hover:text-primary/80 [&_svg]:size-5"
            disabled={!lessonDetail?.previous_lesson}
            onClick={() => {
              if (lessonDetail?.previous_lesson)
                router.push(
                  `/learning/${courseSlug}/lesson/${lessonDetail?.previous_lesson.id}`
                )
            }}
          >
            <ChevronLeft />
            BÀI TRƯỚC
          </Button>

          <Button
            size="lg"
            className="rounded-full font-semibold [&_svg]:size-5"
            disabled={
              !lessonDetail?.next_lesson ||
              !lessonDetail?.lesson_process?.is_completed
            }
            onClick={() => {
              if (
                lessonDetail?.next_lesson &&
                lessonDetail.lesson_process?.is_completed
              )
                router.push(
                  `/learning/${courseSlug}/lesson/${lessonDetail?.next_lesson.id}`
                )
            }}
          >
            BÀI TIẾP THEO
            <ChevronRight />
          </Button>
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <CommentLesson lessonId={lessonId} />
        </div>
      </div>
    </div>
  )
}

export default LearningPathView
