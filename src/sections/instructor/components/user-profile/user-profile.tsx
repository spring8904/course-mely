import { useState } from 'react'
import { KeyRound, Link2, Loader2, User } from 'lucide-react'

import { useGetProfile } from '@/hooks/profile/useProfile'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

import { PasswordSection } from './_components/password-section'
import { ProfileSection } from './_components/profile-section'
import { SocialSection } from './_components/social-section'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserProfileModal({ open, onOpenChange }: Props) {
  const [currentView, setCurrentView] = useState<
    'profile' | 'social' | 'password'
  >('profile')
  const [isEditing, setIsEditing] = useState(false)
  const { data: getProfile, isLoading } = useGetProfile()
  if (isLoading) {
    return (
      <div>
        <Loader2 />
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] overflow-hidden p-0">
        <DialogTitle className="sr-only">Account Settings</DialogTitle>
        <div className="flex h-[600px]">
          <div className="w-[200px] border-r bg-muted/30 p-6">
            <div className="mb-6">
              <h1 className="text-lg font-semibold tracking-tight">Cài Đặt</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Quản lí tài khoản
              </p>
            </div>
            <nav className="space-y-1">
              <Button
                variant={currentView === 'profile' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium"
                onClick={() => setCurrentView('profile')}
              >
                <User className="size-4" />
                Hồ sơ
              </Button>
              <Button
                variant={currentView === 'social' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium"
                onClick={() => setCurrentView('social')}
              >
                <Link2 className="size-4" />
                Mạng xã hội
              </Button>
              <Button
                variant={currentView === 'password' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium"
                onClick={() => setCurrentView('password')}
              >
                <KeyRound className="size-4" />
                Mật khẩu
              </Button>
            </nav>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h2 className="text-sm font-semibold">
                {currentView === 'profile'
                  ? 'Thông tin hồ sơ'
                  : currentView === 'social'
                    ? 'Mạng xã hội'
                    : 'Đổi mật khẩu'}
              </h2>
              {/*<Button*/}
              {/*  variant="ghost"*/}
              {/*  size="icon"*/}
              {/*  className="size-8"*/}
              {/*  onClick={onOpenChange}*/}
              {/*>*/}
              {/*  <X className="size-4" />*/}
              {/*</Button>*/}
            </div>

            <div className="hide-scrollbar flex-1 overflow-y-auto p-6">
              {currentView === 'profile' ? (
                <ProfileSection
                  userData={getProfile?.data}
                  // isEditing={isEditing}
                  // setIsEditing={setIsEditing}
                />
              ) : currentView === 'social' ? (
                <SocialSection
                  socialData={getProfile?.data}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <PasswordSection />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
