import { IMembership } from '@/types'
import { MemberShipItem } from '@/sections/profile/_components/member-ship-item'

type Props = {
  data: IMembership[]
}

export const MembershipTab = ({ data }: Props) => {
  if (data?.length === 0)
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-center">Danh sách Membership trống!</h3>
      </div>
    )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Gói Membership</h3>
        <button className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-100">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {data.map((membership) => (
          <MemberShipItem membership={membership} key={membership?.id} />
        ))}
      </div>
    </div>
  )
}
