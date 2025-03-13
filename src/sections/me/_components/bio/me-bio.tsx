'use client'

import React from 'react'
import { useGetProfile } from '@/hooks/profile/useProfile'

import SocialView from '@/sections/me/_components/bio/_components/social'

const MeBio = () => {
  const { data: profileData, isLoading: isLoadingProfileData } = useGetProfile()

  return (
    <div>
      <div className="section-setting-right">
        <div className="box">
          <div className="widget-tabs style-small">
            <ul className="widget-menu-tab overflow-x-auto">
              <li className="mb-4 text-2xl font-semibold">Mạng xã hội</li>
            </ul>
            <div className="widget-content-tab">
              <SocialView
                profileBioData={profileData}
                isLoadingProfileData={isLoadingProfileData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeBio
