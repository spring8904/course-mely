import { FilePenLine, Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useGetChapterFromLesson } from '@/hooks/learning-path/useLearningPath'
import { useGetNotes } from '@/hooks/note/useNote'
import { formatDuration } from '@/lib/common'

import HtmlRenderer from '@/components/shared/html-renderer'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const NoteList = ({
  open,
  onOpenChange,
  slug,
  lessonId,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  slug: string
  lessonId: string
}) => {
  const router = useRouter()

  const [filters, setFilters] = useState<{
    chapterId: number | null
    sortOrder: 'asc' | 'desc'
  }>({
    chapterId: null,
    sortOrder: 'desc',
  })

  const { data: chapterData } = useGetChapterFromLesson(lessonId)
  const { data: noteData, isLoading } = useGetNotes(slug, filters)

  useEffect(() => {
    if (chapterData?.data.id && filters.chapterId === null && !open) {
      setFilters((prev) => ({
        ...prev,
        chapterId: chapterData.data.id,
      }))
    }
  }, [chapterData, filters.chapterId, open])

  const handleFilterChange = (field: string, value: string | number | null) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="h-screen max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Ghi chú của tôi</SheetTitle>
          <SheetDescription>
            Danh sách ghi chú trong khoá học của bạn.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <div className="mb-4 flex justify-end gap-2">
            <Select
              value={filters.chapterId === null ? 'all' : 'current'}
              onValueChange={(value) => {
                const chapterId =
                  value === 'current' ? chapterData?.data.id : null
                handleFilterChange('chapterId', chapterId)
              }}
              key={filters.chapterId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả các chương" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả các chương</SelectItem>
                <SelectItem value="current">Chương hiện tại</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => handleFilterChange('sortOrder', value)}
              defaultValue="desc"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mới nhất" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Mới nhất</SelectItem>
                <SelectItem value="asc">Cũ nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <Loader2 className="size-8 animate-spin" />
          ) : (
            noteData?.data?.map((note: any) => (
              <div className="mt-6" key={note.id}>
                <div className="flex items-center justify-between">
                  <div
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => {
                      router.push(`/learning/${slug}/lesson/${note.lesson_id}`)
                    }}
                  >
                    <Badge>
                      {formatDuration(Math.round(note.time), 'colon')}
                    </Badge>
                    <h4 className="font-bold text-primary">
                      {note.lesson_name}
                    </h4>
                    <h4 className="font-medium">{note.chapter_name}</h4>
                  </div>
                  <div className="flex gap-2">
                    <FilePenLine size="16" />
                    <Trash size="16" />
                  </div>
                </div>
                <div className="mt-2 rounded-md bg-gray-100 p-4 shadow">
                  <HtmlRenderer html={note.content} />
                </div>
              </div>
            ))
          )}
          {/*<SheetFooter className="mt-4">*/}
          {/*  <Button type="submit">'Tạo ghi chú'</Button>*/}
          {/*</SheetFooter>*/}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NoteList
