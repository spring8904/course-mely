import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

import { IChapter } from '@/types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

type Props = {
  chapters: IChapter[]
  slug: string
}

const CourseChapterTab = ({ chapters, slug }: Props) => {
  const router = useRouter()

  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [addNewChapter, setAddNewChapter] = useState(false)

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Chương trình giảng dạy</h3>
            <p className="mt-2 text-sm font-normal">
              Bắt đầu xây dựng khoá học của bạn bằng cách tạo các phần bài giảng
              và các hoạt động thực hành.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-5">
          {chapters?.map((chapter, chapterIndex) => (
            <Accordion
              type="single"
              collapsible
              key={chapterIndex}
              className="mb-6 w-full"
            >
              <AccordionItem value={`item-${chapter.id}`}>
                <AccordionTrigger className="rounded-lg">
                  {chapter.title}
                </AccordionTrigger>
                <AccordionContent className="mt-5 rounded-lg p-5">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <div className="mb-3">
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
                      </div>
                      <AccordionContent className="mt-3 rounded-lg p-5">
                        <div className="mb-3">
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
                        <div>
                          <div className="flex items-center justify-between">
                            <Label>Danh sách câu hỏi</Label>
                            <Dialog>
                              <DialogTrigger className="rounded-lg bg-primary p-2 text-white">
                                Import Quiz
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
                                <div>
                                  <Label>Import file</Label>
                                  <Input type="file" />
                                  <Button className="mt-3">
                                    Tiến hành import
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="mt-3 rounded-lg border p-4">
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
                        <div className="mt-3">
                          <Label className="mb-3">Bài giảng</Label>
                          <MuxUploader />
                        </div>
                        <div className="mt-3">
                          <Label>Nội dung </Label>
                          <Textarea
                            className="mt-2"
                            placeholder="Nội dung bài giảng"
                          />
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <Button>Cập nhật</Button>
                          <Button>Xem trước</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(`/course/${slug}/coding-exercise`)
                    }}
                  >
                    Coding
                  </Button>
                  {addNewLesson ? (
                    <>
                      <Button
                        onClick={() => setAddNewLesson(false)}
                        className="mt-3"
                      >
                        <CircleX size={18} />
                        Đóng
                      </Button>
                      {selectedLesson ? (
                        <div className="mt-4 flex h-full flex-col justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <Label className="whitespace-nowrap">
                              Bài học mới:
                            </Label>
                            <Input placeholder="Nhập tiêu đề bài học" />
                          </div>
                          <div className="mt-4 flex items-end justify-end">
                            <Button
                              onClick={() => setSelectedLesson(null)}
                              className="mr-3"
                              variant="secondary"
                            >
                              Huỷ
                            </Button>
                            <Button type="submit">Thêm bài học</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex gap-4 rounded-lg border border-dashed p-2">
                          <Button onClick={() => setSelectedLesson('video')}>
                            <Video />
                            Bài giảng
                          </Button>
                          <Button onClick={() => setSelectedLesson('document')}>
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
                    <Button
                      onClick={() => setAddNewLesson(true)}
                      className="mt-3"
                    >
                      <CirclePlus />
                      Thêm bài học
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        {addNewChapter ? (
          <>
            <Button
              onClick={() => setAddNewChapter(false)}
              className="bg-primary"
            >
              <CircleX size={18} />
              Đóng
            </Button>
            <div className="mt-4 flex h-full flex-col justify-between rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Label className="whitespace-nowrap">Chương học mới:</Label>
                <Input placeholder="Nhập tiêu đề" />
              </div>
              <div className="mt-4 flex items-end justify-end">
                <Button
                  onClick={() => setAddNewChapter(false)}
                  className="mr-3"
                  variant="secondary"
                >
                  Huỷ
                </Button>
                <Button type="submit">Thêm chương</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={() => setAddNewChapter(true)}
              className="bg-primary"
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
