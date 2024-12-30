import React from 'react'
import { RxChevronDown, RxStar, RxStarFilled } from 'react-icons/rx'
import { FaRegCirclePlay, FaRegClock } from 'react-icons/fa6'
import { courseData } from '@/sections/home/data/data'
import CourseListItem from '../_components/course-list-item'
import CourseListSidebar from '../_components/course-list-sidebar'

const CourseListView = () => {
  return (
    <div>
      <main className="container mx-auto flex bg-gray-50 px-12 py-8">
        {/* <!-- Sidebar --> */}
        <aside className="w-1/4 pr-4">
          <CourseListSidebar />
        </aside>

        {/* <!-- Course List --> */}
        <section className="w-3/4">
          {/* <!-- selected --> */}
          <div className="mb-4 flex justify-end">
            <select className="rounded-md border border-orange-500 px-3 py-3">
              <option value="default">Mặc định</option>
              <option value="react">react </option>
              <option value="javascript">javascrip</option>
            </select>
          </div>
          {courseData?.map((course) => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default CourseListView
