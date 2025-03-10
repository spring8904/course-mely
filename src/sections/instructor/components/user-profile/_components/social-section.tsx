'use client'

import React, { useEffect, useState } from 'react'
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
  ExternalLink,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  socialData?: any
}

const socialIcons = {
  github: <Github className="size-5" />,
  website: <Globe className="size-5" />,
  youtube: <Youtube className="size-5" />,
  facebook: <Facebook className="size-5" />,
  twitter: <Twitter className="size-5" />,
  linkedin: <Linkedin className="size-5" />,
  instagram: <Instagram className="size-5" />,
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

const socialPlaceholders = {
  github: 'https://github.com/username',
  website: 'https://yourwebsite.com',
  youtube: 'https://youtube.com/@channel',
  facebook: 'https://facebook.com/profile',
  twitter: 'https://twitter.com/username',
  linkedin: 'https://linkedin.com/in/username',
  instagram: 'https://instagram.com/username',
}

export function SocialSection({ socialData }: Props) {
  const [isEditing, setIsEditing] = useState(false)
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
    disabled: isPending,
  })

  useEffect(() => {
    if (socialData?.user?.profile?.bio) {
      const bioData = JSON.parse(socialData?.user?.profile?.bio)
      form.reset(bioData)
    }
  }, [socialData, form])

  function onSubmit(data: ProfileBioFormValues) {
    mutate(data, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  const currentData = socialData?.user?.profile?.bio
    ? JSON.parse(socialData?.user?.profile?.bio)
    : {}

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mạng xã hội</CardTitle>
            <CardDescription className="mt-2">
              Kết nối hồ sơ mạng xã hội và sự hiện diện trực tuyến của bạn
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="shrink-0"
            >
              Chỉnh sửa
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(socialLabels).map(([key, label]) => (
                <div
                  key={key}
                  className="rounded-lg border bg-card text-card-foreground"
                >
                  <div className="flex items-center gap-3 border-b p-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {socialIcons[key as keyof typeof socialIcons]}
                    </div>
                    <div>
                      <h4 className="font-medium">{label}</h4>
                      {!isEditing && currentData[key] && (
                        <a
                          href={currentData[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          Truy cập đường dẫn{' '}
                          <ExternalLink className="ml-1 inline size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {isEditing ? (
                      <FormField
                        control={form.control}
                        name={key as keyof ProfileBioFormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={
                                  socialPlaceholders[
                                    key as keyof typeof socialPlaceholders
                                  ]
                                }
                                className="bg-background"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="truncate text-sm text-muted-foreground">
                        {currentData[key] || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button type="submit">
                  {isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Cập nhật
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
      </CardContent>
    </Card>
  )
}
