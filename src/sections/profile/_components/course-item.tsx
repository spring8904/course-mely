import { ICourse } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, Star, UserPen } from 'lucide-react'
import { formatStringToCurrency } from '@/lib/common'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
  course: ICourse
}

export const CourseItem = ({ course }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      {/* Course Thumbnail */}
      <div className="relative mx-auto h-44">
        <Link href={`/courses/${course?.slug}`}>
          <Image
            src="https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png"
            alt={course?.name}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {/* Course Detail */}
      <div className="space-y-8 px-5 py-4">
        <div className="space-y-3">
          <h3 className="truncate text-base font-medium">
            <Link href={`/courses/${course?.slug}`}>{course?.name}</Link>
          </h3>

          <div>
            {Number(course?.price) === 0 ? (
              <span className="font-bold text-green-500">Miễn phí</span>
            ) : course?.price_sale ? (
              <div className="space-x-2">
                <span className="text-gray-400 line-through">
                  {formatStringToCurrency(course?.price ?? 0)}
                </span>
                <span className="font-bold text-red-500">
                  {formatStringToCurrency(course?.price_sale ?? 0)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-black">
                {formatStringToCurrency(course?.price ?? 0)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-1">
                  <UserPen size={20} />
                  <p>{course?.total_student ?? 0}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Số lượng học viên</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-1">
                  <FileText size={20} />
                  <p>{course?.lessons_count ?? 0}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Số lượng bài học</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-1">
                  <Star size={20} />
                  <p>{course?.avg_rating ?? 0}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Đánh giá</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
