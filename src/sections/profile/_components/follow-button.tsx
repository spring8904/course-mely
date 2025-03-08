import { UserCheck, UserPlus } from 'lucide-react'

export const FollowButton = () => {
  const isFollowing = true

  return (
    <div className="flex items-center justify-center gap-x-2 rounded-3xl border py-2 text-base font-semibold transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-300">
      {isFollowing ? (
        <>
          <UserCheck size={20} />
          <button style={{ all: 'unset' }}>Đang theo dõi</button>
        </>
      ) : (
        <>
          <UserPlus size={20} />
          <button style={{ all: 'unset' }}>Theo dõi</button>
        </>
      )}
    </div>
  )
}
