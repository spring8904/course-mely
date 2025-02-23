import MuxPlayer from '@mux/mux-player-react'

type Props = {
  playbackId: string
}

export const VideoScreen = ({ playbackId }: Props) => {
  return (
    <div className="w-full bg-black">
      <div className="mx-auto aspect-[16/9] w-[70%]">
        <MuxPlayer playbackId={playbackId} className="size-full object-cover" />
      </div>
    </div>
  )
}
