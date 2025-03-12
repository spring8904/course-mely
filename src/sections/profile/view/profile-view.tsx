'use client'

import { UserProfile } from '@/sections/profile/_components/user-profile'
import { FollowButton } from '@/sections/profile/_components/follow-button'
import { UserAbout } from '@/sections/profile/_components/user-about'
import { CourseItem } from '@/sections/profile/_components/course-item'
import { BookText, Loader2 } from 'lucide-react'
import {
  useGetInstructorCourses,
  useGetInstructorProfile,
} from '@/hooks/instructor/profile/useGetProfile'
import ModalLoading from '@/components/common/ModalLoading'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { CoursePagination } from '@/components/common/CoursePagination'

type Props = {
  code: string
}

export const ProfileView = ({ code }: Props) => {
  const router = useRouter()
  const { user } = useAuthStore()
  const [page, setPage] = useState<number>(1)

  if (code === user?.code) router.push('/me')

  const {
    data: instructorProfileData,
    isLoading: instructorProfileDataLoading,
    error,
  } = useGetInstructorProfile(code)
  const { data: instructorCourseData, isLoading: instructorCourseDataLoading } =
    useGetInstructorCourses(code, page)

  console.log('instructorCourseData', instructorCourseData)

  useEffect(() => {
    const savePage = JSON.parse(
      localStorage.getItem('instructorCoursePage') || '{}'
    )
    setPage(savePage)
  }, [])

  const handlePageChange = (pageUrl?: string | null) => {
    if (!pageUrl) return

    const url = new URL(pageUrl)
    const page = Number(url.searchParams.get('page'))

    if (page) {
      setPage(page)
      localStorage.setItem('instructorCoursePage', JSON.stringify(page))
    }
  }

  if (instructorProfileDataLoading)
    return (
      <div className="min-h-screen">
        <ModalLoading />
      </div>
    )

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center text-5xl font-bold">
        <h2>{error?.message}!</h2>
      </div>
    )

  return (
    <div className="mx-auto mb-16 mt-9 grid w-[90%] grid-cols-12 gap-16">
      <div className="col-span-3 space-y-5">
        {/* Avatar, Name and Bio */}
        <UserProfile
          name={instructorProfileData?.instructor?.name ?? ''}
          avatar={instructorProfileData?.instructor?.avatar ?? ''}
          bio={instructorProfileData?.instructor?.bio ?? []}
          aboutMe={instructorProfileData?.instructor?.about_me ?? ''}
          avgRating={instructorProfileData?.instructor?.avg_rating ?? '0'}
        />

        {/* Button Follow */}
        <FollowButton />

        {/* About */}
        <UserAbout
          totalFollowers={
            instructorProfileData?.instructor?.total_followers ?? 0
          }
          totalCourses={instructorProfileData?.instructor?.total_courses ?? 0}
          timeJoined={
            instructorProfileData?.instructor?.created_at ?? new Date()
          }
          email={instructorProfileData?.instructor?.email ?? ''}
          address={instructorProfileData?.instructor?.address ?? ''}
          phone={instructorProfileData?.instructor?.phone ?? ''}
        />
      </div>

      <div className="col-span-9">
        <div
          className="flex items-center space-x-2 p-2"
          style={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <BookText size={20} />
          <p className="font-bold">
            Khoá học của {instructorProfileData?.instructor?.name} (
            {instructorProfileData?.instructor?.total_courses})
          </p>
        </div>

        {instructorCourseDataLoading ? (
          <div className="flex size-full items-center justify-center">
            <Loader2 className="mx-auto size-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-3 gap-6">
              {instructorCourseData?.courses &&
              instructorCourseData?.courses?.data?.length > 0 ? (
                instructorCourseData?.courses?.data?.map((course: any) => (
                  <CourseItem course={course} key={course.id} />
                ))
              ) : (
                <p className="text-xl font-bold">Danh sách khoá học trống...</p>
              )}
            </div>

            {instructorCourseData?.courses && (
              <CoursePagination
                data={instructorCourseData.courses}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
