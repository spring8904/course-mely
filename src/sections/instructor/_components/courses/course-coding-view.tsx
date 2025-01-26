'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import SolutionTab from './solution-tab'

const CourseCodingView = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  useEffect(() => {
    setIsDialogOpen(true)
  }, [])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <div className="relative min-h-screen">
      <header className="fixed inset-x-0 top-0 z-10 flex justify-between bg-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <MoveLeft size={18} />
          <span>Quay lại chương trình giảng dạy</span>
          <span className="text-xl font-bold">Coding</span>
        </div>
        <Button>Lưu</Button>
      </header>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Hãy chọn một ngôn ngữ lập trình cho bài tập?
            </DialogTitle>
          </DialogHeader>

          <div className="mb-4">
            <Label>Chọn ngôn ngữ</Label>
            <Select
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="mt-2 w-full rounded-lg border p-2">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="secondary">Huỷ</Button>
            <Button>Bắt đầu tạo</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="plan" className="py-[68px] [&>*]:mt-0">
        <TabsContent value="plan">
          <main className="flex flex-col p-4">
            <div className="container mx-auto max-w-4xl p-4">
              <h2 className="text-2xl font-bold">Bài tập Coding</h2>
              <p className="mt-4">
                Bài tập mã hóa cho phép người học thực hành một phần công việc
                thực tế có mục tiêu và nhận được phản hồi ngay lập tức. Chúng
                tôi khuyên bạn nên làm theo các bước sau: Lên kế hoạch cho bài
                tập, xác định giải pháp và hướng dẫn người học. Điều này sẽ đảm
                bảo bạn định hình được vấn đề và cung cấp hướng dẫn cần thiết
                với giải pháp trong đầu.
              </p>
              <div className="mt-4">
                <Label>Tiêu đề bài tập</Label>
                <Input placeholder="Nhập tiêu đề bài tập" />
              </div>
              <div className="mt-4">
                <Label>Chọn ngôn ngữ</Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="mt-2 w-full rounded-lg border p-2">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="c++">C++</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </main>
        </TabsContent>
        <TabsContent value="solution">
          <SolutionTab />
        </TabsContent>
        <TabsContent value="guide">
          Make changes to your account here.
        </TabsContent>
        <footer className="fixed inset-x-0 bottom-0 z-10 flex justify-center border-t bg-white p-4">
          <TabsList className="flex gap-4">
            <TabsTrigger value="plan">Kế hoạch tập luyện</TabsTrigger>
            <TabsTrigger value="solution">Giải pháp</TabsTrigger>
            <TabsTrigger value="guide">Hướng dẫn</TabsTrigger>
          </TabsList>
        </footer>
      </Tabs>
    </div>
  )
}

export default CourseCodingView
