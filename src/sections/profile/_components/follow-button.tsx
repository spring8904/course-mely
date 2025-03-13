import { Loader2, UserCheck, UserPlus } from 'lucide-react'
import {
  useCheckInstructorFollow,
  useFollowInstructor,
} from '@/hooks/instructor/profile/useGetProfile'

type Props = {
  code: string
}

export const FollowButton = ({ code }: Props) => {
  const { data, isLoading: isChecking } = useCheckInstructorFollow(code)
  const { mutate, isPending } = useFollowInstructor()

  const isLoading = isChecking || isPending
  const isFollowed = !!data?.followed

  return (
    <button
      onClick={() => mutate({ code })}
      className="flex w-full items-center justify-center gap-2 rounded-3xl border px-4 py-2 text-base font-semibold transition hover:bg-gray-300 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : isFollowed ? (
        <UserCheck size={20} />
      ) : (
        <UserPlus size={20} />
      )}
      <span>{isLoading ? '' : isFollowed ? 'Đang theo dõi' : 'Theo dõi'}</span>
    </button>
  )
}
