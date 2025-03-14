'use client'

import { ProfileSection } from '../components/settings/profile-section'

import ModalLoading from '@/components/common/ModalLoading'
import { useGetProfile } from '@/hooks/profile/useProfile'
import CareersSection from '@/sections/instructor/components/settings/career-section'
import { CertificateSection } from '@/sections/instructor/components/settings/certificate-section'
import BankSection from '../components/settings/bank-section'
import { PasswordSection } from '../components/settings/password-section'
import { SocialSection } from '../components/settings/social-section'

const SettingsView = ({ tab }: { tab: string }) => {
  const { data: getProfile, isLoading } = useGetProfile()

  if (isLoading) return <ModalLoading />

  return (() => {
    switch (tab) {
      case 'profile':
        return <ProfileSection userData={getProfile?.data} />
      case 'social':
        return <SocialSection socialData={getProfile?.data} />
      case 'careers':
        return <CareersSection careersData={getProfile?.data?.user?.profile} />
      case 'certificates':
        return (
          <CertificateSection
            certificateData={getProfile?.data?.user?.profile}
          />
        )
      case 'password':
        return <PasswordSection />
      case 'bank':
        return <BankSection />
      default:
        return null
    }
  })()
}
export default SettingsView
