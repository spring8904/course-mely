// 'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MuxPlayer from '@mux/mux-player-react/lazy'
import {
  ChevronLeft,
  CirclePlay,
  MessageCircleMore,
  Plus,
  StickyNote,
} from 'lucide-react'

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
import { chapterData, lessonData } from '@/sections/courses/data/data'

const LearningLessonView = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-x-0 top-0 z-10 h-[70px] bg-[#292f3b]">
        <div className="container mx-auto flex h-full items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <ChevronLeft className="text-white" />
            </Link>
            <Image src="/images/Logo.png" alt="logo" width={54} height={54} />
            <Link href={''} className="text-white">
              Khoá học ReactJS cơ bản cho người mới bắt đầu
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <LearningProcess value={50} />
              <span className="text-base font-normal text-white">
                50/100 bài học
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StickyNote className="text-white" />
              <span className="text-base font-normal text-white">Ghi chú</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 py-[70px]">
        <div className="col-span-9">
          <MuxPlayer
            loading="viewport"
            playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
            metadata={{
              video_id: 'video-id-123456',
              video_title: 'Bick Buck Bunny',
              viewer_user_id: 'user-id-bc-789',
            }}
            className="w-full object-cover"
          />
          <div className="mx-[36px] mt-3 flex justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                ReactJS là gì? Tại sao nên học ReactJS?
              </h2>
              <span className="text-[12px] text-gray-600">
                Cập nhật 27/12/2024
              </span>
            </div>
            <div className="flex h-[40px] items-center gap-2 rounded-lg bg-[#ebebeb] p-4 text-black">
              <Plus />
              <span>Thêm ghi chú</span>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-3 font-semibold shadow-md">
            <h2>Nội dung khoá học</h2>
          </div>
          {chapterData?.map((chapter, chapterIndex) => (
            <Accordion type="single" collapsible key={chapterIndex}>
              <AccordionItem
                value={`item-${chapter.id}`}
                className="border-b last:border-0"
              >
                <AccordionTrigger>{chapter.title}</AccordionTrigger>
                <AccordionContent className="m-0">
                  {lessonData
                    ?.filter((lesson) => lesson.chapterId === chapter.id)
                    .map((lesson, lessonIndex) => (
                      <div
                        className="mb-5 flex items-center gap-2 border-b border-dashed pb-5 text-sm font-medium last:mb-0 last:border-b-0 last:pb-0"
                        key={lessonIndex}
                      >
                        <CirclePlay />
                        {lesson.content}
                        <span className="ml-auto shrink-0 text-xs font-semibold">
                          0 phút
                        </span>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-[#292f3b] py-4">
        <div className="container mx-auto flex h-full items-center justify-center gap-4">
          <Link href={''} className="rounded-md bg-[#F69983] p-2 text-white">
            Bài trước
          </Link>
          <Link href={''} className="rounded-md bg-[#FF6652] p-2 text-white">
            Bài tiếp theo
          </Link>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg bg-[#FF6652] px-4 py-2 text-white">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2">
                <MessageCircleMore />
                Hỏi đáp
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
