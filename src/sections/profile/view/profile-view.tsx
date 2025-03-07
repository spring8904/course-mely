import { UserProfile } from '@/sections/profile/_components/user-profile'
import { FollowButton } from '@/sections/profile/_components/follow-button'
import { UserAbout } from '@/sections/profile/_components/user-about'
import { IInstructorProfile } from '@/types'

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

export default fakeInstructorProfile

export const ProfileView = ({ code }: Props) => {
  console.log(code)
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

      <div className="col-span-9 bg-gray-300 p-4">Phần 9</div>
    </div>
  )
}
