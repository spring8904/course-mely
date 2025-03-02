import { useState } from 'react'
import {
  BadgeCheck,
  Building2,
  KeyRound,
  Link2,
  Loader2,
  User,
} from 'lucide-react'

import { useGetProfile } from '@/hooks/profile/useProfile'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import CareersSection from '@/sections/instructor/components/user-profile/_components/career-section'
import { CertificateSection } from '@/sections/instructor/components/user-profile/_components/certificate-section'

import { PasswordSection } from './_components/password-section'
import { ProfileSection } from './_components/profile-section'
import { SocialSection } from './_components/social-section'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserProfileModal({ open, onOpenChange }: Props) {
  const [currentView, setCurrentView] = useState<
    'profile' | 'social' | 'password' | 'careers' | 'certificates'
  >('profile')
  const [isEditing, setIsEditing] = useState(false)
  const { data: getProfile, isLoading } = useGetProfile()
  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1050px] overflow-hidden p-0">
        <DialogTitle className="sr-only">Account Settings</DialogTitle>
        <div className="flex h-[650px]">
          <div className="w-[280px] border-r bg-muted/30 p-6">
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
                variant={currentView === 'careers' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium"
                onClick={() => setCurrentView('careers')}
              >
                <Building2 className="size-4" />
                Nghề nghiệp
              </Button>
              <Button
                variant={currentView === 'certificates' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium"
                onClick={() => setCurrentView('certificates')}
              >
                <BadgeCheck className="size-4" />
                Chứng chỉ
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
                    : currentView === 'careers'
                      ? 'Thông tin nghề nghiệp'
                      : currentView === 'certificates'
                        ? 'Chứng chỉ'
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
              ) : currentView === 'careers' ? (
                <CareersSection careersData={getProfile?.data?.user?.profile} />
              ) : currentView === 'certificates' ? (
                <CertificateSection
                  certificateData={getProfile?.data?.user?.profile}
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
