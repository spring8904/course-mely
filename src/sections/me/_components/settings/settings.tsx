'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { updateProfile, UpdateProfilePayload } from '@/types/Profile'
import { useGetProfile, useUpdateProfile } from '@/hooks/profile/useProfile'

import SocialView from '@/sections/me/_components/settings/_components/social'

const MeSetting = () => {
  const [activeTab, setActiveTab] = useState('Profile')
  const { data: profileData, isLoading } = useGetProfile()
  const { mutate, isPending } = useUpdateProfile()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfile),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      about_me: '',
    },
  })

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData?.data.user.name || '')
      setValue('phone', profileData?.data?.user?.profile?.phone || '')
      setValue('address', profileData.data?.user?.profile?.address || '')
      setValue('about_me', profileData.data?.user?.profile?.about_me || '')
    }
  }, [profileData, setValue])

  const onSubmit = (data: UpdateProfilePayload) => {
    mutate(data)
  }

  if (isLoading) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

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
                Profile
              </li>
              <li
                className={`item-title ${activeTab === 'Password' ? 'active' : ''}`}
                onClick={() => setActiveTab('Password')}
              >
                Password
              </li>
              <li
                className={`item-title ${activeTab === 'Social' ? 'active' : ''}`}
                onClick={() => setActiveTab('Social')}
              >
                Social
              </li>
            </ul>
            {/* Tab Content */}
            <div className="widget-content-tab">
              {activeTab === 'Profile' && (
                <div className="widget-content-inner">
                  <div className="row">
                    <div className="profile-wrap">
                      <div className="profile-img">
                        <img
                          id="profile-img"
                          src={profileData?.data.user?.avatar}
                          alt={profileData?.data.user?.name}
                        />
                      </div>
                      <div className="profile-info">
                        <h4>{profileData?.data.user?.name}</h4>
                        <label id="name-file">
                          PNG or JPG no bigger than 800px wide and tall.
                        </label>
                      </div>

                      <div className="profile-btn">
                        <input id="file-input" type="file" />
                        <button className="btn-update tf-button-default">
                          Update <i className="icon-arrow-top-right"></i>
                        </button>
                        <a href="#" className="btn-delete tf-button-default">
                          Delete <i className="icon-arrow-top-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="shop-checkout"
                  >
                    <div className="cols">
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field1"
                          type="text"
                          placeholder="Nhập tên của bạn"
                          tabIndex={2}
                          {...register('name')}
                          // defaultValue="name"
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field1"
                        >
                          Your Name
                        </label>
                        {errors.name && (
                          <span className="text-danger">
                            {errors.name.message}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field2"
                          type="text"
                          placeholder="Nhập số điện thoại của bạn"
                          tabIndex={2}
                          {...register('phone')}
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field2"
                        >
                          Phone Number
                        </label>
                        {errors.phone && (
                          <span className="text-danger">
                            {errors.phone.message}
                          </span>
                        )}
                      </fieldset>
                    </div>
                    <fieldset className="tf-field mt-4">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                        {...register('address')}
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Address
                      </label>
                      {errors.address && (
                        <span className="text-danger">
                          {errors.address.message}
                        </span>
                      )}
                    </fieldset>
                    <fieldset className="tf-field mt-4">
                      <textarea
                        className="tf-input style-1"
                        rows={4}
                        placeholder="Hãy giới thiệu về bạn"
                        tabIndex={2}
                        defaultValue="Hãy giới thiệu về bản thân của bạn"
                        {...register('about_me')}
                      />
                      <label
                        className="tf-field-label type-textarea fs-15"
                        htmlFor=""
                      >
                        About Me
                      </label>
                      {errors.about_me && (
                        <span className="text-danger">
                          {errors.about_me.message}
                        </span>
                      )}
                    </fieldset>
                    <button
                      type="submit"
                      className="tf-btn"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <>
                          Update Profile <i className="icon-arrow-top-right" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'Password' && (
                <div className="widget-content-inner">
                  <form action="#" className="shop-checkout">
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Current Password
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        New Password
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Re-Type New Password
                      </label>
                    </fieldset>
                  </form>
                  <a href="#" type="submit" className="tf-btn">
                    Update Password <i className="icon-arrow-top-right"></i>
                  </a>
                </div>
              )}
              {activeTab === 'Social' && <SocialView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeSetting
