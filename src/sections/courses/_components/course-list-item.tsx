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
    <div>
      <div className="mt-6 space-y-4">
        <div className="flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row">
          <Image
            alt={course.name}
            className="mb-4 rounded-lg md:mb-0"
            height="400"
            src={course.thumbnail!}
            width="150"
          />
          <div className="flex-1 md:ml-4">
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-gray-600">
              Văn Tùng | {course.totalStudent} học viên
            </p>
            <div className="my-2 flex items-center">
              <div className="flex text-orange-500">
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
                <RxStarFilled />
              </div>
              <span className="ml-2 text-gray-600"> 4.3k </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaRegClock />
              <span>19h 30m</span>
              <FaRegCirclePlay />
              <span>20</span>
            </div>
            <div className="mt-2">
              <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                {course.level}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <span className="block text-lg font-bold text-orange-600">
                {course.priceSale} đ
              </span>
              <span className="block text-gray-500 line-through">
                {course.price} đ
              </span>
            </div>
            <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white md:mt-0">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseListItem
