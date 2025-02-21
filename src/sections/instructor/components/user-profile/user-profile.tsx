import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface User {
  name: string
  email: string
  avatar: string
}

export function UserProfileModal({
  user,
  open,
  onOpenChange,
}: {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 rounded-lg bg-white p-4 shadow-lg">
        <DialogTitle className="text-xl font-semibold">
          Thông tin cá nhân
        </DialogTitle>
        <div className="mt-4 flex items-center gap-4">
          <Avatar className="size-16 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
