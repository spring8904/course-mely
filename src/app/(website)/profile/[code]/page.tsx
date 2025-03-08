import { ProfileView } from '@/sections/profile/view/profile-view'

type Props = {
  params: {
    code: string
  }
}

const Profile = ({ params }: Props) => {
  const { code } = params

  return <ProfileView code={code} />
}

export default Profile
