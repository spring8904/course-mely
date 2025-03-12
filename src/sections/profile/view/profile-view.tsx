'use client'

import { UserProfile } from '@/sections/profile/_components/user-profile'
import { FollowButton } from '@/sections/profile/_components/follow-button'
import { UserAbout } from '@/sections/profile/_components/user-about'
import { CourseItem } from '@/sections/profile/_components/course-item'
import { IInstructorProfile } from '@/types'
import { BookText } from 'lucide-react'
import { useGetProfileInstructor } from '@/hooks/instructor/profile/useGetProfile'
import ModalLoading from '@/components/common/ModalLoading'
import React from 'react'

type Props = {
  code: string
}

const fakeInstructorProfile: IInstructorProfile = {
  id: 1,
  user_id: 101,
  code: 'INST20250307',
  phone: '0987654321',
  address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
  experience: 'Hơn 5 năm giảng dạy về lập trình web và React.js.',
  bio: [
    'Giảng viên tại Đại học Công nghệ TP.HCM.',
    'Tác giả của nhiều khóa học về JavaScript và Frontend.',
    'Đam mê chia sẻ kiến thức và giúp học viên phát triển sự nghiệp.',
  ],
  avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  email: 'instructor@example.com',
  name: 'Nguyễn Văn B',
  about_me:
    'Tôi là một lập trình viên và giảng viên với nhiều năm kinh nghiệm trong ngành công nghệ.',
  avg_rating: '4.8',
  total_student: '1200',
  total_courses: 10,
  created_at: new Date('2023-01-15T08:00:00Z'),
  updated_at: new Date('2025-03-07T12:00:00Z'),
}

const fakeCourses: any = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  user_id: fakeInstructorProfile.user_id,
  category_id: Math.floor(Math.random() * 5) + 1,
  category: {
    id: Math.floor(Math.random() * 5) + 1,
    name: `Danh mục ${Math.floor(Math.random() * 5) + 1}`,
  },
  code: `COURSE${20250000 + index + 1}`,
  name: `Khóa học lập trình ${index + 1}`,
  slug: `khoa-hoc-lap-trinh-${index + 1}`,
  thumbnail: `https://source.unsplash.com/random/400x300?sig=${index}`,
  intro: `Giới thiệu về khóa học lập trình ${index + 1}.`,
  price: Math.floor(Math.random() * 200) * 1000,
  price_sale: Math.floor(Math.random() * 200) * 1000,
  description: `Đây là mô tả của khóa học lập trình ${index + 1}.`,
  content: `Nội dung chi tiết của khóa học lập trình ${index + 1}.`,
  level: ['Beginner', 'Intermediate', 'Advanced'][
    Math.floor(Math.random() * 3)
  ],
  duration: `${Math.floor(Math.random() * 10) + 5} giờ`,
  total_student: Math.floor(Math.random() * 500) + 100,
  total_lesson: Math.floor(Math.random() * 20) + 5,
  total_duration: `${Math.floor(Math.random() * 100) + 10} phút`,
  requirements: ['Máy tính', 'Kết nối internet'],
  benefits: ['Nâng cao kỹ năng lập trình', 'Thực hành với bài tập thực tế'],
  qa: [
    {
      question: 'Khóa học này dành cho ai?',
      answer: 'Dành cho người mới bắt đầu và trung cấp.',
    },
    {
      question: 'Tôi có thể học trên thiết bị nào?',
      answer: 'Bạn có thể học trên máy tính và điện thoại.',
    },
  ],
  is_popular: Math.random() > 0.5 ? 1 : 0,
  status: 'published',
  chapters: [],
  lessons_count: Math.floor(Math.random() * 30) + 10,
  chapters_count: Math.floor(Math.random() * 10) + 3,
  ratings_count: Math.floor(Math.random() * 100) + 10,
  avg_rating: (Math.random() * 2 + 3).toFixed(1),
  total_rating: (Math.random() * 1000 + 500).toString(),
  accepted: Math.random() > 0.5 ? new Date() : null,
  user: {
    id: fakeInstructorProfile.user_id,
    name: fakeInstructorProfile.name,
    email: fakeInstructorProfile.email,
    avatar: fakeInstructorProfile.avatar,
  },
  name_instructor: fakeInstructorProfile.name,
  code_instructor: fakeInstructorProfile.code,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  is_free: Math.random() > 0.5 ? 1 : 0,
  total_video_duration: Math.floor(Math.random() * 100) + 20,
  is_enrolled: Math.random() > 0.5,
}))

export const ProfileView = ({ code }: Props) => {
  const {
    data: instructorProfileData,
    isLoading: instructorProfileDataLoading,
  } = useGetProfileInstructor(code)
  console.log(instructorProfileData)

  if (instructorProfileDataLoading)
    return (
      <div className="min-h-screen">
        <ModalLoading />
      </div>
    )

  return (
    <div className="mx-auto mb-16 mt-9 grid w-[90%] grid-cols-12 gap-16">
      <div className="col-span-3 space-y-5">
        {/* Avatar, Name and Bio */}
        <UserProfile
          name={fakeInstructorProfile?.name}
          avatar={fakeInstructorProfile?.avatar ?? ''}
          bio={fakeInstructorProfile?.bio ?? []}
          code={fakeInstructorProfile?.code ?? ''}
          avgRating={fakeInstructorProfile?.avg_rating ?? '0'}
        />

        {/* Button Follow */}
        <FollowButton />

        {/* About */}
        <UserAbout
          totalStudent={fakeInstructorProfile?.total_student ?? ''}
          totalCourses={fakeInstructorProfile?.total_courses ?? 0}
          timeJoined={fakeInstructorProfile.created_at}
          email={fakeInstructorProfile?.email}
          address={fakeInstructorProfile?.address ?? ''}
          phone={fakeInstructorProfile?.phone}
        />
      </div>

      <div className="col-span-9">
        <div
          className="flex items-center space-x-2 p-2"
          style={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <BookText size={20} />
          <p className="font-bold">
            Khoá học của {fakeInstructorProfile?.name} ({fakeCourses?.length})
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-6">
          {fakeCourses && fakeCourses?.length > 0 ? (
            fakeCourses.map((course: any) => (
              <CourseItem course={course} key={course.id} />
            ))
          ) : (
            <p className="text-xl font-bold">Danh sách khoá học trống...</p>
          )}
        </div>
      </div>
    </div>
  )
}
