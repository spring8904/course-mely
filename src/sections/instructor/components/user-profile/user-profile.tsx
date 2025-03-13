import {
  BadgeCheck,
  Building2,
  CreditCard,
  KeyRound,
  Link2,
  Loader2,
  User,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useGetProfile } from '@/hooks/profile/useProfile'
import { cn } from '@/lib/utils'
import CareersSection from '@/sections/instructor/components/user-profile/_components/career-section'
import { CertificateSection } from '@/sections/instructor/components/user-profile/_components/certificate-section'
import BankSection from './_components/bank-section'
import { PasswordSection } from './_components/password-section'
import { ProfileSection } from './_components/profile-section'
import { SocialSection } from './_components/social-section'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const tabs = [
  { tab: 'profile', title: 'Hồ sơ', icon: <User /> },
  { tab: 'bank', title: 'Ngân hàng', icon: <CreditCard /> },
  { tab: 'password', title: 'Mật khẩu', icon: <KeyRound /> },
  { tab: 'social', title: 'Mạng xã hội', icon: <Link2 /> },
  { tab: 'careers', title: 'Nghề nghiệp', icon: <Building2 /> },
  { tab: 'certificates', title: 'Chứng chỉ', icon: <BadgeCheck /> },
]

export function UserProfileModal({ open, onOpenChange }: Props) {
  const [currentView, setCurrentView] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const { data: getProfile, isLoading } = useGetProfile()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="overflow-hidden p-0 md:max-w-2xl lg:max-w-[1050px]"
      >
        <div className="flex h-[650px]">
          <div className="w-[280px] border-r bg-muted/30 p-6">
            <div className="mb-6">
              <h1 className="text-lg font-semibold tracking-tight">Cài Đặt</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Quản lí tài khoản
              </p>
            </div>
            <nav className="space-y-1">
              {tabs.map(({ tab, icon, title }) => (
                <Button
                  key={tab}
                  variant={'ghost'}
                  className={cn(
                    'w-full justify-start hover:bg-primary/10 hover:text-primary',
                    currentView === tab && 'bg-primary/5 text-primary'
                  )}
                  onClick={() => setCurrentView(tab)}
                >
                  {icon}
                  {title}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 flex-col">
            {isLoading ? (
              <Loader2 className="mx-auto mt-16 size-8 animate-spin text-muted-foreground" />
            ) : (
              <div className="hide-scrollbar flex-1 overflow-y-auto px-6 py-10">
                {(() => {
                  switch (currentView) {
                    case 'profile':
                      return <ProfileSection userData={getProfile?.data} />
                    case 'social':
                      return <SocialSection socialData={getProfile?.data} />
                    case 'careers':
                      return (
                        <CareersSection
                          careersData={getProfile?.data?.user?.profile}
                        />
                      )
                    case 'certificates':
                      return (
                        <CertificateSection
                          certificateData={getProfile?.data?.user?.profile}
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                        />
                      )
                    case 'password':
                      return <PasswordSection />
                    case 'bank':
                      return <BankSection />
                    default:
                      return null
                  }
                })()}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
