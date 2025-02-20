import MuxPlayer from '@mux/mux-player-react/lazy'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface VideoDialogProps {
  muxPlaybackId: string | null
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DialogVideoPreview: React.FC<VideoDialogProps> = ({
  muxPlaybackId,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Video Bài Giảng</DialogTitle>
        </DialogHeader>
        {muxPlaybackId ? (
          <MuxPlayer
            loading="viewport"
            playbackId={muxPlaybackId || ''}
            autoPlay={false}
            className="h-auto w-full rounded-lg"
          />
        ) : (
          <DialogDescription>Chưa có video.</DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogVideoPreview
