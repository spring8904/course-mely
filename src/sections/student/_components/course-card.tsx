import Image from 'next/image'
import { Star } from 'lucide-react'

import { ICourse } from '@/types'
import { formatCurrency } from '@/lib/common'
import { cn } from '@/lib/utils'

import { Card, CardContent } from '@/components/ui/card'

interface CourseCardProps {
  course: ICourse
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card key={course.id} className="rounded-lg border-none shadow-custom">
      <CardContent className="flex flex-col px-4 py-5">
        <div className="relative h-60">
          <Image
            src={course.thumbnail!}
            alt={course.name}
            fill
            className="object-cover"
          />

          <span className="absolute right-3 top-3 rounded bg-white px-[10px] py-[6px] text-sm font-medium text-[#667085]">
            {course.level}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star fill="#FC6441" className="size-3 text-primary" />
            <Star fill="#FC6441" className="size-3 text-primary" />
            <Star fill="#FC6441" className="size-3 text-primary" />
            <Star fill="#FC6441" className="size-3 text-primary" />
            <Star fill="#FC6441" className="size-3 text-primary" />

            <span className="text-sm font-semibold">4.3k</span>
          </div>

          <span className="text-sm font-medium">Web Develop</span>
        </div>

        <h4 className="mt-6 line-clamp-1 font-semibold text-[#101828]">
          {course.name}
        </h4>

        <div className="mt-6 flex gap-4 text-base font-semibold text-primary">
          <span
            className={cn(course.price_sale && 'text-[#4D5756] line-through')}
          >
            {course.price && formatCurrency(course.price)}
          </span>
          {course.price_sale && (
            <span>{formatCurrency(course.price_sale)} đ</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default CourseCard
