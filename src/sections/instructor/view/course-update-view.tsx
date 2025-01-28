'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MuxUploader from '@mux/mux-uploader-react'
import {
  CircleHelp,
  CirclePlay,
  CirclePlus,
  CircleX,
  FileCode2,
  ScrollText,
  SquarePen,
  TableOfContents,
  Target,
  Trash2,
  Video,
} from 'lucide-react'
import ReactQuill from 'react-quill'

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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { chapterData } from '@/sections/courses/data/data'

import 'react-quill/dist/quill.snow.css'

const CourseUpdateView = ({ slug }: { slug: string }) => {
  console.log(slug)
  const [value, setValue] = useState('')
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [video, setVideo] = useState<string | ArrayBuffer | null>(null)
  const [addNewChapter, setAddNewChapter] = useState(false)
  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const router = useRouter()

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVideo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddNewChapter = () => {
    setAddNewChapter(true)

    console.log('add new chapter')
  }

  const handleAddNewLesson = () => {
    setAddNewLesson(true)

    console.log('add new chapter')
  }

  const handleSelectLesson = (lessonType: any) => {
    setSelectedLesson(lessonType)
    console.log(lessonType)
  }

  const handleClick = () => {
    router.push(`/course/${slug}/coding-exercise`)
  }
  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">
              Cập nhật nội dung khoá học: {slug}
            </h3>
            <Button className="bg-primary">Gửi yêu cầu duyệt khoá học</Button>
          </div>
          <Tabs defaultValue="courseBenefits">
            <Card className="mt-6 py-3">
              <TabsList className="flex gap-4">
                <TabsTrigger
                  value="courseInfo"
                  className="w-full py-3 text-black data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-[#FF6652]"
                >
                  <div className="flex gap-2">
                    <TableOfContents size={18} />
                    <span className="font-medium">Nội dung khoá học</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="courseBenefits"
                  className="w-full py-3 text-black data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-[#FF6652]"
                >
                  <div className="flex gap-2">
                    <Target size={18} />
                    <span className="font-medium">Mục tiêu khoá học</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="courseChapter"
                  className="w-full py-3 text-black data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-[#FF6652]"
                >
                  <div className="flex gap-2">
                    <TableOfContents size={18} />
                    <span className="font-medium">Chương trình giảng dạy</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Card>

            <div className="mt-6">
              <TabsContent value="courseBenefits" className="m-0">
                <Card className="">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Mục tiêu khoá học</h3>
                        <p className="mt-2 text-sm font-normal">
                          Thông tin sẽ được hiển thị trên trang Tổng quan, dễ
                          dàng tiếp cận Học viên hơn.
                        </p>
                      </div>
                      <div>
                        <Button variant="destructive">Nhập lại</Button>
                        <Button className="ms-2 bg-primary">
                          Lưu thông tin
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h3 className="text-base font-semibold">
                        Lợi ích mà khoá học mang lại?
                      </h3>
                      <p className="text-[14px] text-[#4b5563]">
                        Bạn phải nhập ít nhất 4 lợi ích mà Học viên có thể nhận
                        được sau khi kết thúc khoá học.
                      </p>
                      <div>
                        <Input
                          placeholder="Nhập lợi ích số 1"
                          className="mt-3 h-[40px]"
                        />
                        <Input
                          placeholder="Nhập lợi ích số 2"
                          className="mt-3 h-[40px]"
                        />
                        <Input
                          placeholder="Nhập lợi ích số 3"
                          className="mt-3 h-[40px]"
                        />
                        <Input
                          placeholder="Nhập lợi ích số 4"
                          className="mt-3 h-[40px]"
                        />
                        <div className="mt-3">
                          <Button>
                            <CirclePlus size={18} />
                            Thêm lợi ích vào khoá học của bạn
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-base font-semibold">
                        Yêu cầu khi tham gia khoá học?
                      </h3>
                      <p className="text-[14px] text-[#4b5563]">
                        Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị
                        mà học viên bắt buộc phải có trước khi tham gia khóa
                        học.
                      </p>
                      <div>
                        <Input
                          placeholder="Nhập yêu cầu số 1"
                          className="mt-3 h-[40px]"
                        />
                        <div className="mt-3">
                          <Button>
                            <CirclePlus size={18} />
                            Thêm yêu cầu khi tham gia khoá học
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-base font-semibold">
                        Câu hỏi thường gặp?
                      </h3>
                      <p className="text-[14px] text-[#4b5563]">
                        Hãy liệt kê các câu hỏi mà học viên thường gặp khi tham
                        gia khoá học của bạn.
                      </p>
                      <div>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Nhập câu hỏi số 1"
                            className="mt-3 h-[40px]"
                          />
                          <Input
                            placeholder="Nhập câu trả lời số 1"
                            className="mt-3 h-[40px]"
                          />
                        </div>
                        <div className="mt-3">
                          <Button>
                            <CirclePlus size={18} />
                            Thêm câu hỏi thường gặp của khoá học
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="courseInfo" className="m-0">
                <Card className="">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">
                          Thông tin khoá học
                        </h3>
                        <p className="mt-2 text-sm font-normal">
                          Thông tin sẽ được hiển thị trên trang Tổng quan, dễ
                          dàng tiếp cận Học viên hơn.
                        </p>
                      </div>
                      <div>
                        <Button variant="destructive">Nhập lại</Button>
                        <Button className="ms-2 bg-primary">
                          Lưu thông tin
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-base font-semibold">
                        Tiêu đề khoá học
                      </Label>
                      <Input
                        placeholder="Nhập lợi ích số 1"
                        className="mt-3 h-[40px]"
                        defaultValue={slug}
                      />
                      <p className="mt-2 text-[14px] text-[#4b5563]">
                        Tiêu đề của bạn không những phải thu hút sự chú ý, chứa
                        nhiều thông tin mà còn được tối ưu hóa để dễ tìm kiếm
                      </p>
                    </div>
                    <div className="mt-3">
                      <Label className="text-base font-semibold">
                        Mô tả khoá học
                      </Label>
                      <ReactQuill
                        className="mt-2"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                      />
                      <p className="mt-2 text-[14px] text-[#4b5563]">
                        Mô tả phải dài ít nhất là 200 từ.
                      </p>
                    </div>
                    <div className="mt-3">
                      <Label className="text-base font-semibold">
                        Giá khoá học
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Nhập giá khoá học"
                          className="mt-3 h-[40px]"
                        />
                        <Input
                          type="number"
                          placeholder="Giá khuyến mãi"
                          className="mt-3 h-[40px]"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-base font-semibold">
                        Thông tin cơ bản
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="mt-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục khoá học" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                Công nghệ thông tin
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                Lập trình web
                              </SelectItem>
                              <SelectItem value="m@support.com">
                                Lập trình di động
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn cấp độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                Công nghệ thông tin
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                Lập trình web
                              </SelectItem>
                              <SelectItem value="m@support.com">
                                Lập trình di động
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Trạng thái khoá học" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                Công khai
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                Riêng tư
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-base font-semibold">
                        Ảnh đại diện
                      </Label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div
                          className="h-[200px] w-full rounded-lg bg-primary"
                          style={{
                            backgroundImage: image ? `url(${image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        ></div>
                        <div>
                          <p>Tải hình ảnh khoá học nên tại đây</p>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              id="picture"
                              type="file"
                              className="mt-3"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-base font-semibold">
                        Video giới thiệu
                      </Label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="h-[200px] w-full rounded-lg bg-primary">
                          {video ? (
                            <video
                              className="size-full rounded-lg object-cover"
                              controls
                              src={
                                typeof video === 'string' ? video : undefined
                              }
                            />
                          ) : (
                            <p>Chưa có video</p>
                          )}
                        </div>
                        <div>
                          <p>Tải video khoá học lên tại đây</p>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              id="video"
                              type="file"
                              className="mt-3"
                              onChange={handleVideoChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="courseChapter" className="m-0">
                <Card className="">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">
                          Chương trình giảng dạy
                        </h3>
                        <p className="mt-2 text-sm font-normal">
                          Bắt đầu xây dựng khoá học của bạn bằng cách tạo các
                          phần bài giảng và các hoạt động thực hành.
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-5">
                      {chapterData?.map((chapter, chapterIndex) => (
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
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                              >
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
                                          <SelectItem value="video">
                                            Video
                                          </SelectItem>
                                          <SelectItem value="document">
                                            Tài liệu
                                          </SelectItem>
                                          <SelectItem value="quizz">
                                            Câu hỏi
                                          </SelectItem>
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
                                                Để thực hiện việc import quiz
                                                bạn cần tải file mẫu của chúng
                                                tôi
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
                                          <span>
                                            Câu hỏi 1: Tìm hiểu về ReactJS
                                          </span>
                                          <div className="flex cursor-pointer items-center gap-4">
                                            <SquarePen size={18} />
                                            <Trash2 size={18} />
                                          </div>
                                        </div>
                                        <div className="mt-5 flex items-center justify-between border-b border-dashed">
                                          <span>
                                            Câu hỏi 1: Tìm hiểu về ReactJS
                                          </span>
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
                              <button onClick={handleClick}>Coding</button>
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
                                          onClick={() =>
                                            setSelectedLesson(null)
                                          }
                                          className="mr-3"
                                          variant="secondary"
                                        >
                                          Huỷ
                                        </Button>
                                        <Button type="submit">
                                          Thêm bài học
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="mt-4 flex gap-4 rounded-lg border border-dashed p-2">
                                      <Button
                                        onClick={() =>
                                          handleSelectLesson('video')
                                        }
                                      >
                                        <Video />
                                        Bài giảng
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleSelectLesson('document')
                                        }
                                      >
                                        <ScrollText />
                                        Tài liệu
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleSelectLesson('quiz')
                                        }
                                      >
                                        <CircleHelp />
                                        Câu hỏi
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleSelectLesson('file')
                                        }
                                      >
                                        <FileCode2 />
                                        Bài tập
                                      </Button>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Button
                                  onClick={handleAddNewLesson}
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
                            <Label className="whitespace-nowrap">
                              Chương học mới:
                            </Label>
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
                          onClick={handleAddNewChapter}
                          className="bg-primary"
                        >
                          <SquarePen size={18} />
                          Thêm chương mới
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default CourseUpdateView
