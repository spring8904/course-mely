'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Twitter,
  Youtube,
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ProfileBioFormValues, profileBioSchema } from '@/validations/profile'
import { useUpdateBioProfile } from '@/hooks/profile/useProfile'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
  socialData?: any
  isEditing: boolean
  setIsEditing: (value: boolean) => void
}

const socialIcons = {
  github: <Github className="size-4" />,
  website: <Globe className="size-4" />,
  youtube: <Youtube className="size-4" />,
  facebook: <Facebook className="size-4" />,
  twitter: <Twitter className="size-4" />,
  linkedin: <Linkedin className="size-4" />,
  instagram: <Instagram className="size-4" />,
}

const socialLabels = {
  github: 'GitHub',
  website: 'Website',
  youtube: 'YouTube',
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
}

export function SocialSection({ socialData, isEditing, setIsEditing }: Props) {
  console.log('tdđ 124 888s0os', socialData)
  const { mutate, isPending } = useUpdateBioProfile()
  const form = useForm<ProfileBioFormValues>({
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
    if (socialData?.user?.profile?.bio) {
      const bioData = JSON.parse(socialData?.user?.profile?.bio)
      form.reset(bioData)
    }
  }, [socialData, form.reset])

  function onSubmit(data: ProfileBioFormValues) {
    mutate(data)
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {Object.entries(socialLabels).map(([key, label]) => (
            <div key={key} className="rounded-lg border">
              <div className="border-b p-3">
                <div className="flex items-center gap-2">
                  {socialIcons[key as keyof typeof socialIcons]}
                  <h4 className="font-medium">{label}</h4>
                </div>
              </div>
              <div className="p-3">
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name={key as keyof ProfileBioFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder={`Your ${label} URL`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {socialData?.user?.profile?.bio
                      ? JSON.parse(socialData?.user?.profile?.bio)?.[key]
                      : 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <div className="flex gap-2">
              <Button type="submit">
                {isPending && <Loader2 className="animate-spin" />} Save changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  form.reset()
                }}
              >
                Quay lại
              </Button>
            </div>
          )}
        </form>
      </Form>
      {!isEditing && (
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Sửa đường dẫn mạng xã hội
        </Button>
      )}
    </div>
  )
}
