import { IMembership } from '@/types'
import { CreditCard } from 'lucide-react'
import { formatStringToCurrency } from '@/lib/common'

type Props = {
  membership: IMembership
}

export const MemberShipItem = ({ membership }: Props) => {
  return (
    <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-orange-500 text-white">
            <CreditCard size={20} />
          </div>
          <h4 className="font-bold text-gray-900">{membership?.name}</h4>
        </div>
        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
          {Number(membership?.price) === 0 ? 'Miễn phí' : 'Phổ biến'}
        </span>
      </div>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-2xl font-bold text-transparent">
          {formatStringToCurrency(membership?.price)}
        </span>
        <span className="text-sm text-gray-500">
          /{membership?.duration_months} tháng
        </span>
      </div>
      <p className="mb-4 text-sm text-gray-600">{membership?.description}</p>
      {membership?.benefits && membership?.benefits?.length > 0 && (
        <>
          <h4 className="font-bold">Lợi ích khi đăng ký:</h4>
          <ul className="mb-4 space-y-2 text-gray-700">
            {membership.benefits.map((benefit, index) => (
              <li key={index} className="list-inside list-decimal">
                {benefit}
              </li>
            ))}
          </ul>
        </>
      )}

      <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600">
        {Number(membership?.price) > 0 ? 'Đăng ký ngay' : 'Dùng thử miễn phí'}
      </button>
    </div>
  )
}
