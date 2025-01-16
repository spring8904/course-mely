import React from 'react'
import { courseData } from '@/sections/home/data/data'
import CourseListItem from '../_components/course-list-item'
import CourseListSidebar from '../_components/course-list-sidebar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const CourseListView = () => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl">
        <div className="container flex px-2 py-8">
          {/* <!-- Sidebar --> */}
          <aside className="w-1/4 pr-5">
            <CourseListSidebar />
          </aside>
          <section className="w-3/4">
            {/* <!-- selected --> */}
            <div className="mb-4 flex justify-end">
              <Select>
                <SelectTrigger className="h-[52px] w-[150px] rounded-md border-orange-500 p-3">
                  <SelectValue placeholder="Mặc định" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Danh sách khóa học */}
            <div className="flex flex-row flex-wrap gap-4">
              {courseData.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CourseListView
