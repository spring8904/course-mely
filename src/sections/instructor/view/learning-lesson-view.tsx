'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageCircleMore,
  Notebook,
} from 'lucide-react'

import { ILesson } from '@/types'
import { lessonTypeIcons } from '@/configs'
import { useGetCourseDetails } from '@/hooks/course/useCourse'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import LearningProcess from '@/components/common/LearningProcess'
import { LessonContent } from '@/sections/lessons/_components/lesson-content'

type Props = {
  courseSlug: string
}

const LearningLessonView = ({ courseSlug }: Props) => {
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null)
  const { data: courseDetail, isLoading } = useGetCourseDetails(courseSlug)

  useEffect(() => {
    if (courseDetail?.chapters?.length) {
      const firstLesson = courseDetail?.chapters[0]?.lessons?.[0] || null
      setSelectedLesson(firstLesson)
    }
  }, [courseDetail])

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="mx-auto size-10 animate-spin" />
      </div>
    )

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="sticky inset-x-0 top-0 z-10 bg-[#292f3b]">
        <div className="container mx-auto flex h-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <ChevronLeft className="text-white" />
            </Link>
            <Image src="/images/Logo.png" alt="logo" width={36} height={36} />
            <p className="font-bold text-white">{courseDetail?.name}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <LearningProcess value={0} />
              <span className="text-sm text-white">
                <span className="font-bold">
                  0/{courseDetail?.lessons_count}
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
      <div className="grid grow grid-cols-12">
        <div className="col-span-9 min-h-screen overflow-hidden">
          {selectedLesson && <LessonContent lesson={selectedLesson} />}
        </div>

        <div className="col-span-3 max-h-screen overflow-y-auto">
          <div className="border-l p-4 font-semibold">
            <h2 className="text-lg font-bold">Nội dung khoá học</h2>
          </div>
          {courseDetail?.chapters?.map((chapter, chapterIndex) => (
            <Accordion type="single" collapsible key={chapterIndex}>
              <AccordionItem
                value={`item-${chapter?.id}`}
                className="border-b last:border-0"
              >
                <AccordionTrigger className="hover:bg-gray-200">
                  <div>
                    <h3 className="text-lg font-bold">
                      {chapterIndex + 1}. {chapter?.title}
                    </h3>
                    <p className="mt-1 text-xs font-light">
                      0/{chapter?.lessons_count} | 00:00
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="m-0 p-0">
                  <div className="overflow-y-auto">
                    {chapter?.lessons?.map((lesson, lessonIndex) => {
                      const isSelected = lesson?.id === selectedLesson?.id

                      return (
                        <div
                          className={`flex items-center space-x-3 border-b px-2 py-3 transition-colors duration-300 ${isSelected ? 'cursor-default bg-orange-100' : 'hover:cursor-pointer hover:bg-gray-200'} `}
                          key={lessonIndex}
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <div>
                            <p>{lessonTypeIcons[lesson?.type]}</p>
                          </div>
                          <div>
                            <p>
                              {chapterIndex + 1}.{lessonIndex + 1}{' '}
                              {lesson?.title}
                            </p>
                            <p className="mt-1 text-xs font-light">00:00</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 z-50 bg-[#f0f0f0] py-3">
        <div className="container mx-auto flex h-full items-center justify-center gap-4">
          <Link
            href={''}
            className="rounded-md border-2 border-transparent px-3 py-2 hover:border-primary"
          >
            <p className="flex items-center font-bold uppercase text-primary">
              <ChevronLeft />
              <span>Bài trước</span>
            </p>
          </Link>
          <Link
            href={''}
            className="rounded-md border-2 border-primary bg-transparent px-3 py-2 text-primary transition-colors duration-200 ease-in-out hover:bg-primary hover:text-white"
          >
            <p className="flex items-center font-bold uppercase">
              <span>Bài tiếp theo</span>
              <ChevronRight />
            </p>
          </Link>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg bg-primary px-4 py-2 text-white">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2 font-bold">
                <MessageCircleMore />
                <p>Hỏi đáp</p>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningLessonView
