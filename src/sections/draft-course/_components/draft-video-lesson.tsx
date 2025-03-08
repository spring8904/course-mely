import HtmlRenderer from '@/components/shared/html-renderer'
import { formatDate } from '@/lib/common'
import { DraftLesson } from '@/types/DraftCourse'
import MuxPlayer from '@mux/mux-player-react/lazy'

type Props = {
  lesson: DraftLesson
}

const DraftVideoLesson = ({ lesson }: Props) => {
  return (
    <>
      <div className="aspect-[21/9] bg-black/95">
        <div className="mx-auto aspect-video h-full">
          <MuxPlayer
            playbackId={lesson?.mux_playback_id}
            accentColor={'hsl(var(--primary))'}
            className="h-full"
          />
        </div>
      </div>

      <div className="mx-16 mb-40 mt-8">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Cập nhật{' '}
              {formatDate(lesson.updated_at, {
                dateStyle: 'long',
              })}
            </p>
          </div>
        </div>
        <HtmlRenderer html={lesson.content} className="mt-8" />
      </div>
    </>
  )
}

export default DraftVideoLesson
