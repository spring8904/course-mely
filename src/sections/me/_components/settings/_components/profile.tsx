import Image from 'next/image'
import { Loader2, Upload } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useUpdateProfile } from '@/hooks/profile/useProfile'
import { useForm } from 'react-hook-form'
import { updateProfile, UpdateProfilePayload } from '@/validations/profile'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  profileData: any
  isLoadingProfileData: boolean
}

const ProfileMeView = ({ profileData, isLoadingProfileData }: Props) => {
  const { mutate, isPending } = useUpdateProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('avatar', file)
      // Create preview URL for the selected image
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  if (isLoadingProfileData) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  const onSubmit = (data: UpdateProfilePayload) => {
    mutate(data)
  }
  return (
    <div className="widget-content-inner">
      <div className="row">
        <div className="profile-wrap">
          <div
            className="profile-img group relative cursor-pointer"
            onClick={handleAvatarClick}
          >
            <Image
              id="profile-img"
              src={previewUrl || profileData?.data?.user?.avatar}
              alt={profileData?.data?.user?.name}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div className="bg-opacity/50 absolute inset-0 flex items-center justify-center rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100">
              <Upload className="text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="profile-info">
            <h4>{profileData?.data?.user?.name}</h4>
            <label id="name-file">{profileData?.data?.user?.email}</label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="shop-checkout">
        <div className="cols">
          <fieldset className="tf-field">
            <input
              className="tf-input style-1"
              id="field1"
              type="text"
              placeholder="Nhập họ tên của bạn"
              tabIndex={2}
              {...register('name')}
              aria-required="true"
            />
            <label className="tf-field-label fs-15" htmlFor="field1">
              Họ tên
            </label>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
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
            <label className="tf-field-label fs-15" htmlFor="field2">
              Số điện thoại
            </label>
            {errors.phone && (
              <span className="text-danger">{errors.phone.message}</span>
            )}
          </fieldset>
        </div>
        <fieldset className="tf-field mt-4">
          <input
            className="tf-input style-1"
            id="field4"
            type="text"
            placeholder="Nhập địa chỉ của bạn"
            tabIndex={2}
            aria-required="true"
            {...register('address')}
          />
          <label className="tf-field-label fs-15" htmlFor="field4">
            Địa chỉ
          </label>
          {errors.address && (
            <span className="text-danger">{errors.address.message}</span>
          )}
        </fieldset>
        <fieldset className="tf-field mt-4">
          <textarea
            className="tf-input style-1"
            rows={5}
            placeholder="Hãy giới thiệu về bạn"
            tabIndex={2}
            defaultValue="Hãy giới thiệu về bản thân của bạn"
            {...register('about_me')}
          />
          <label className="tf-field-label type-textarea fs-15" htmlFor="">
            Giới thiệu
          </label>
          {errors.about_me && (
            <span className="text-danger">{errors.about_me.message}</span>
          )}
        </fieldset>
        <button type="submit" className="tf-btn" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Cập nhật hồ sơ <i className="icon-arrow-top-right" />
        </button>
      </form>
    </div>
  )
}
export default ProfileMeView
