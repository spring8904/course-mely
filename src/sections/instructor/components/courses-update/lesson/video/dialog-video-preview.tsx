import MuxPlayer from '@mux/mux-player-react/lazy'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Video Bài Giảng</DialogTitle>
        </DialogHeader>
        {muxPlaybackId ? (
          <div className="aspect-video h-full">
            <MuxPlayer
              loading="viewport"
              playbackId={muxPlaybackId || ''}
              autoPlay={false}
              className="h-full"
              accentColor={'hsl(var(--primary))'}
            />
          </div>
        ) : (
          <DialogDescription>Chưa có video.</DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogVideoPreview
