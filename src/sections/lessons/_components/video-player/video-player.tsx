import { ILesson } from '@/types'

import { VideoContent } from '@/sections/lessons/_components/video-player/_component/video-content'
import { VideoScreen } from '@/sections/lessons/_components/video-player/_component/video-screen'

type Props = {
  lesson: ILesson
}

export const VideoPlayer = ({ lesson }: Props) => {
  const { title, updated_at, lessonable, content } = lesson

  const updatedAt = new Date(updated_at)

  const decodeHtml = (html: string) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent

  console.log('lessonable?.mux_playback_id', lessonable?.mux_playback_id)

  return (
    <div className="w-full">
      <VideoScreen playbackId={lessonable?.mux_playback_id as string} />
      <VideoContent
        title={title}
        content={decodeHtml(content) ?? ''}
        updatedAtMonth={updatedAt.getMonth() + 1}
        updatedAtYear={updatedAt.getFullYear()}
      />
    </div>
  )
}
