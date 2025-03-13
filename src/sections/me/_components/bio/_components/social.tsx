'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ProfileBioFormValues, profileBioSchema } from '@/validations/profile'
import { useUpdateBioProfile } from '@/hooks/profile/useProfile'

interface Props {
  profileBioData: any
  isLoadingProfileData: boolean
}

const SocialView = ({ profileBioData, isLoadingProfileData }: Props) => {
  const { mutate, isPending } = useUpdateBioProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileBioFormValues>({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {
      github: '',
      website: '',
      youtube: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  })

  useEffect(() => {
    if (profileBioData?.data?.user?.profile?.bio) {
      const bioData = JSON.parse(profileBioData.data.user.profile.bio)
      reset(bioData)
    }
  }, [profileBioData, reset])

  const onSubmit = (data: ProfileBioFormValues) => {
    mutate(data)
  }

  if (isLoadingProfileData) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="widget-content-inner">
      <form onSubmit={handleSubmit(onSubmit)} className="shop-checkout">
        {[
          { name: 'github', label: 'GitHub' },
          { name: 'website', label: 'Website' },
          { name: 'youtube', label: 'YouTube' },
          { name: 'facebook', label: 'Facebook' },
          { name: 'twitter', label: 'Twitter' },
          { name: 'linkedin', label: 'LinkedIn' },
          { name: 'instagram', label: 'Instagram' },
        ].map(({ name, label }) => (
          <fieldset className="tf-field mb-2" key={name}>
            <input
              className="tf-input style-1"
              id={name}
              type="text"
              placeholder={`Enter your ${label} link`}
              {...register(name as keyof ProfileBioFormValues)}
            />
            <label className="tf-field-label fs-15" htmlFor={name}>
              {label}
            </label>
            {errors[name as keyof ProfileBioFormValues] && (
              <p className="text-red-500">
                {errors[name as keyof ProfileBioFormValues]?.message}
              </p>
            )}
          </fieldset>
        ))}

        <button type="submit" className="tf-btn" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}Cập nhật
          mạng xã hội<i className="icon-arrow-top-right"></i>
        </button>
      </form>
    </div>
  )
}

export default SocialView
