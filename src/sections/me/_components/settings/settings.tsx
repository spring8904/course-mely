'use client'

import React, { useState } from 'react'
import { useGetProfile } from '@/hooks/profile/useProfile'

import SocialView from '@/sections/me/_components/settings/_components/social'

import PassWordView from './_components/password'
import ProfileMeView from '@/sections/me/_components/settings/_components/profile'

const MeSetting = () => {
  const [activeTab, setActiveTab] = useState('Profile')
  const { data: profileData, isLoading: isLoadingProfileData } = useGetProfile()

  return (
    <div>
      <div className="section-setting-right section-right">
        <div className="box">
          <div className="widget-tabs style-small">
            {/* Tab Menu */}
            <ul className="widget-menu-tab overflow-x-auto">
              <li
                className={`item-title ${activeTab === 'Profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('Profile')}
              >
                Hồ sơ
              </li>
              <li
                className={`item-title ${activeTab === 'Password' ? 'active' : ''}`}
                onClick={() => setActiveTab('Password')}
              >
                Mật khẩu
              </li>
              <li
                className={`item-title ${activeTab === 'Social' ? 'active' : ''}`}
                onClick={() => setActiveTab('Social')}
              >
                Mạng xã hội
              </li>
            </ul>
            {/* Tab Content */}
            <div className="widget-content-tab">
              {activeTab === 'Profile' && (
                <ProfileMeView
                  profileData={profileData}
                  isLoadingProfileData={isLoadingProfileData}
                />
              )}

              {activeTab === 'Password' && <PassWordView />}
              {activeTab === 'Social' && (
                <SocialView
                  profileBioData={profileData}
                  isLoadingProfileData={isLoadingProfileData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeSetting
