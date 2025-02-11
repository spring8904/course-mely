'use client'

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Flame } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const PostUpdateView = ({ slug }: { slug: string }) => {
  return (
    <div>
      {' '}
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr,300px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">
                    Thông tin bài viết: {slug}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 p-2"
                  >
                    <Flame className="size-4 text-orange-500" />
                    Bài viết hot
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input className="mt-1" />
                  </div>

                  <div>
                    <Label>Hình ảnh mới</Label>
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
                          readonly: false,
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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="mb-2 text-lg font-medium">Hình đại diện</h2>
                <div className="mb-2 border-t"></div>
                <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 p-4">
                  <img
                    src="https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=800&auto=format&fit=crop&q=60"
                    alt="Featured"
                    className="size-full rounded object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="mb-2 text-lg font-medium">Tuỳ chỉnh</h2>
                <div className="mb-2 border-t"></div>
                <div className="space-y-4">
                  <div>
                    <Label>Trạng thái</Label>

                    <RadioGroup defaultValue="draft" className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft">Draft</Label>
                        <RadioGroupItem value="pending" id="pending" />
                        <Label htmlFor="pending">Pending</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id="published" />
                        <Label htmlFor="published">Published</Label>
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Private</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Ngày xuất bản</Label>
                    <Input
                      type="datetime-local"
                      defaultValue="2025-02-10T11:13"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="mb-2 text-lg font-medium">Danh mục</h2>
                <div className="mb-2 border-t"></div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="mb-2 text-lg font-medium">Tags</h2>
                <div className="mb-2 border-t"></div>
                <Input placeholder="Nhập tags" />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="secondary">Quay lại danh sách</Button>
              <Button>Xuất bản</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostUpdateView
