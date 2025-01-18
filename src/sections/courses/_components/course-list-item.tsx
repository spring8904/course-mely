import { Button } from '@/components/ui/button'
import { ICourse } from '@/types'
import Image from 'next/image'
import React from 'react'
import { FaRegCirclePlay, FaRegClock } from 'react-icons/fa6'
import { RxStarFilled } from 'react-icons/rx'

interface CourseListItemProps {
  course: ICourse
}
const CourseListItem = ({ course }: CourseListItemProps) => {
  return (
    <div className="w-[305px]">
      <div className="rounded-lg bg-white p-3 shadow-md">
        <Image
          alt={course.name}
          className="mb-2 rounded-lg"
          src={course.thumbnail!}
          width="300"
          height="150"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-gray-600">
              Văn Tùng | {course.totalStudent} Học viên
            </p>
            <div className="my-1">
              <div className="flex items-center text-orange-500">
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
                <div className="ml-2 text-gray-600">4.3k</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaRegClock />
              <span>19h 30m</span>
              <FaRegCirclePlay />
              <span>20 bài giảng</span>
            </div>
            <div className="mt-2">
              <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                {course.level}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div className="space-x-1 text-right">
              <span className="text-lg font-bold text-orange-600">
                {course.priceSale}đ
              </span>
              <span className="text-sm text-gray-500 line-through">
                {course.price}đ
              </span>
            </div>
            <Button>Đăng ký ngay</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseListItem
