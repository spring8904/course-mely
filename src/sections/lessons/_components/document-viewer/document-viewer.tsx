import { ILesson } from '@/types'
import { formatDate } from '@/lib/common'

import HtmlRenderer from '@/components/shared/html-renderer'

type Props = {
  lesson: ILesson
}

export const DocumentViewer = ({ lesson }: Props) => {
  return (
    <div className="mx-16 mb-40 mt-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật vào{' '}
          {formatDate(lesson.updated_at, {
            dateStyle: 'long',
          })}
        </p>
      </div>

      <HtmlRenderer html={lesson.content} className="mt-8" />
    </div>
  )
}
