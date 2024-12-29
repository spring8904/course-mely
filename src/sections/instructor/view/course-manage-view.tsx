import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const CourseManageView = () => {
  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Quản lý khóa học</p>
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Button className="bg-primary">Tạo khoá học mới</Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Thêm tiêu đề và chọn danh mục cho khoá học
                  </DialogTitle>
                  <DialogDescription>
                    Bạn có thể thêm tiêu đề và chọn danh mục cho khoá học của
                    mình.
                  </DialogDescription>
                </DialogHeader>
                <form>
                  <div className="mb-3">
                    <Label htmlFor="email">Tiêu đề khoá học</Label>
                    <Input placeholder="Nhập tiêu đề cho khoá học" />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="email">Danh mục khoá học</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục cho khoá học" />
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
                  <div className="flex justify-end">
                    <Button className="bg-primary">Tiếp tục tạo khoá học</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Thông tin</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      alt=""
                      className="size-16 shrink-0 rounded-lg object-cover"
                      height={80}
                      src="https://res.cloudinary.com/dvrexlsgx/image/upload/v1734990491/oxbmdtk4x3jvfhxvhnec.jpg"
                      width={80}
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                        Khoá học ReactJS cơ bản cho người mới bắt đầu
                      </h3>
                      <h4 className="text-xs text-slate-500 lg:text-sm">
                        Công nghệ thông tin
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold lg:text-base">
                    500.000đ
                  </span>
                </TableCell>{' '}
                <TableCell>
                  <Badge className="bg-green-500">Đã duyệt</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Button className="bg-indigo-600">Chi tiết</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default CourseManageView
