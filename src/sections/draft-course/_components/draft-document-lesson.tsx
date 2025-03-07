import { formatDate } from '@/lib/common'

import HtmlRenderer from '@/components/shared/html-renderer'
import { DraftLesson } from '@/types/DraftCourse'

type Props = {
  lesson: DraftLesson
}

const DraftDocumentLesson = ({ lesson }: Props) => {
  return (
    <div className="mx-16 mb-40 mt-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật{' '}
          {formatDate(lesson.updated_at, {
            dateStyle: 'long',
          })}
        </p>
      </div>

      <HtmlRenderer html={lesson.content} className="mt-8" />
    </div>
  )
}

export default DraftDocumentLesson
