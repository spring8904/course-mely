import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Loader2, Mail, MapPin, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { updateProfile, UpdateProfilePayload } from '@/validations/profile'
import { useUpdateProfile } from '@/hooks/profile/useProfile'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

interface Props {
  userData: any
}

export function ProfileSection({ userData }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    userData?.user.avatar || null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate, isPending } = useUpdateProfile()

  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfile),
    defaultValues: {
      name: userData?.user.name || '',
      phone: userData?.user.profile.phone || '',
      address: userData?.user.profile.address || '',
      about_me: userData?.user.profile.about_me || '',
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type || !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('File must be an image (JPEG, PNG, or WebP)')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 5MB')
      return
    }

    form.setValue('avatar', file)
    setPreviewImage(URL.createObjectURL(file))
  }

  function onSubmit(data: UpdateProfilePayload) {
    if (!data.avatar) {
      delete data.avatar
    }

    mutate(data, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="size-24 border-4 border-white bg-white shadow-lg">
                    <AvatarImage
                      src={previewImage || userData?.user.avatar}
                      alt="Profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl">
                      {userData?.user.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 size-8 rounded-full shadow-lg"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="size-4" />
                    </Button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-semibold">
                    {userData?.user.name}
                  </h2>
                  <div className="mt-2 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4" />
                      <span>{userData?.user.email}</span>
                    </div>
                  </div>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="mt-4">
                    Cập nhật thông tin cá nhân
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          {!isEditing ? (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <Phone className="size-5" />
                      Thông tin liên hệ
                    </h3>
                    <div className="space-y-3 pl-7">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Số điện thoại
                        </p>
                        <p className="mt-1">
                          {userData?.user.profile.phone || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Địa chỉ Email
                        </p>
                        <p className="mt-1">{userData?.user.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <MapPin className="size-5" />
                      Vị trí
                    </h3>
                    <div className="space-y-3 pl-7">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Địa chỉ
                        </p>
                        <p className="mt-1">
                          {userData?.user.profile.address || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <User className="size-5" />
                      Giới thiệu về bạn
                    </h3>
                    <div className="pl-7">
                      <p className="text-muted-foreground">
                        {userData?.user.profile.about_me ||
                          'No description provided'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ tên</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="about_me"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giới thiệu về bạn</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              className="resize-none"
                              rows={8}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setPreviewImage(userData?.user.avatar || null)
                          form.reset()
                        }}
                      >
                        Quay lại
                      </Button>
                      <Button type="submit" disabled={isPending}>
                        {isPending && (
                          <Loader2 className="mr-2 size-4 animate-spin" />
                        )}
                        Lưu thay đổi
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
