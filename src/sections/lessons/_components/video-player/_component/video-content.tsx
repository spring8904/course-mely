import { CirclePlus } from 'lucide-react'

type Props = {
  title: string
  content: string
  updatedAtMonth: number
  updatedAtYear: number
}

export const VideoContent = ({
  title,
  content,
  updatedAtMonth,
  updatedAtYear,
}: Props) => (
  <div className="mx-auto w-[70%] py-5">
    {/*Header Content*/}
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <button className="flex items-center space-x-1 rounded-md bg-gray-100 px-3 py-1 font-bold text-primary transition-colors duration-200 ease-in-out hover:bg-gray-200">
          <CirclePlus />
          <span className="uppercase">Thêm ghi chú tại 00:00</span>
        </button>
      </div>
      <p className="text-xs">
        Cập nhật tháng {updatedAtMonth} năm {updatedAtYear}
      </p>
    </div>

    {/*Main content*/}
    <div className="mt-10">{content}</div>
  </div>
)
