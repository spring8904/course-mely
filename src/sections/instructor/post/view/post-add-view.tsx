'use client'

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const PostAddView = () => {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <h2 className="mb-2 text-lg font-medium">Thông tin bài viết</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      placeholder="Nhập tiêu đề..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Hình ảnh</Label>
                    <div className="mt-1">
                      <Input
                        type="file"
                        id="image"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Mô tả bài viết</Label>
                    <div className="mt-1">
                      <Editor
                        apiKey="m3o33nrpj98lm1ueo3zwefgum674bex794nb3rzs8c04amvk"
                        init={{
                          plugins:
                            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                          toolbar:
                            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                          min_height: 300,
                          menubar: true,
                          branding: false,
                          statusbar: true,
                          resize: true,
                        }}
                        initialValue="Welcome to TinyMCE!"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 text-lg font-medium">Tuỳ chỉnh</h2>
              <div className="mb-2 border-t"></div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ngày xuất bản</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 text-lg font-medium">Danh mục</h2>
              <div className="mb-3 border-t"></div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 text-lg font-medium">Tags</h2>
              <div className="mb-3 border-t"></div>
              <Input placeholder="Chọn tags" />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Xuất bản</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostAddView
