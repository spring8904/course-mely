import { useState } from 'react'
import Link from 'next/link'
import MuxUploader from '@mux/mux-uploader-react'
import { Label } from '@radix-ui/react-label'
import {
  CircleHelp,
  CirclePlay,
  CirclePlus,
  CircleX,
  FileCode2,
  ScrollText,
  SquarePen,
  Trash2,
  Video,
} from 'lucide-react'

import { IChapter, LessonType } from '@/types'
import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import CreateChapter from './chapter/create-chapter'
import CreateLesson from './lesson/create-lesson'

type Props = {
  chapters: IChapter[]
  slug: string
}

const CourseChapterTab = ({ chapters, slug }: Props) => {
  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>()
  const [addNewChapter, setAddNewChapter] = useState(false)

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="text-xl">Chương trình giảng dạy</CardTitle>
        <CardDescription>
          Bắt đầu xây dựng khoá học của bạn bằng cách tạo các phần bài giảng và
          các hoạt động thực hành.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chapters?.map((chapter, chapterIndex) => (
            <Accordion type="single" collapsible key={chapterIndex}>
              <AccordionItem value={`item-${chapter.id}`}>
                <AccordionTrigger className="rounded-lg">
                  {chapter.title}
                </AccordionTrigger>
                <AccordionContent className="mt-3 rounded-lg p-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="rounded-lg">
                        <div className="flex w-full items-center gap-3 text-sm font-semibold">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <CirclePlay size={18} />
                              <div>Bài giảng số 1</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <SquarePen size={18} />
                              <Trash2 size={18} />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 space-y-3 rounded-lg p-4">
                        <div className="space-y-2">
                          <Label>Loại bài giảng</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chon loại bài giảng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="document">Tài liệu</SelectItem>
                              <SelectItem value="quizz">Câu hỏi</SelectItem>
                              <SelectItem value="coding">
                                Bài tập Code
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>Danh sách câu hỏi</Label>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">Import Quiz</Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>
                                    Import Quiz vào bài học
                                  </DialogTitle>
                                  <DialogDescription>
                                    Để thực hiện việc import quiz bạn cần tải
                                    file mẫu của chúng tôi
                                  </DialogDescription>
                                </DialogHeader>
                                <Button>Tải mẫu</Button>

                                <div className="space-y-2">
                                  <Label>Import file</Label>
                                  <Input type="file" />
                                  <Button className="mt-3">
                                    Tiến hành import
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between border-b border-dashed">
                              <span>Câu hỏi 1: Tìm hiểu về ReactJS</span>
                              <div className="flex cursor-pointer items-center gap-4">
                                <SquarePen size={18} />
                                <Trash2 size={18} />
                              </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between border-b border-dashed">
                              <span>Câu hỏi 1: Tìm hiểu về ReactJS</span>
                              <div className="flex cursor-pointer items-center gap-4">
                                <SquarePen size={18} />
                                <Trash2 size={18} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Bài giảng</Label>
                          <MuxUploader />
                        </div>
                        <div className="space-y-2">
                          <Label>Nội dung </Label>
                          <Textarea placeholder="Nội dung bài giảng" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Xem trước</Button>
                          <Button>Cập nhật</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-3">
                    <Link
                      href={`/course/${slug}/coding-exercise`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'mr-2'
                      )}
                    >
                      Coding
                    </Link>
                    {addNewLesson ? (
                      <>
                        <Button
                          onClick={() => setAddNewLesson(false)}
                          variant="secondary"
                        >
                          <CircleX size={18} />
                          Đóng
                        </Button>

                        {selectedLesson ? (
                          <CreateLesson
                            onHide={() => setSelectedLesson(undefined)}
                            type={selectedLesson!}
                            chapterId={chapter.id!}
                          />
                        ) : (
                          <div className="mt-4 flex justify-between rounded-lg border border-dashed p-2">
                            <Button onClick={() => setSelectedLesson('video')}>
                              <Video />
                              Bài giảng
                            </Button>
                            <Button
                              onClick={() => setSelectedLesson('document')}
                            >
                              <ScrollText />
                              Tài liệu
                            </Button>
                            <Button onClick={() => setSelectedLesson('quiz')}>
                              <CircleHelp />
                              Câu hỏi
                            </Button>
                            <Button onClick={() => setSelectedLesson('file')}>
                              <FileCode2 />
                              Bài tập
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <Button onClick={() => setAddNewLesson(true)}>
                        <CirclePlus />
                        Thêm bài học
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        {addNewChapter ? (
          <CreateChapter onHide={() => setAddNewChapter(false)} />
        ) : (
          <>
            <Button
              onClick={() => setAddNewChapter(true)}
              className="mt-3 bg-primary"
            >
              <SquarePen size={18} />
              Thêm chương mới
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default CourseChapterTab
