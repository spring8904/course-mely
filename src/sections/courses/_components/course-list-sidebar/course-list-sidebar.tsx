import React from 'react'

import { ICourseFilter } from '@/types'
import { ICategory } from '@/types/Category'

import { CategorySidebar } from '@/sections/courses/_components/course-list-sidebar/_components/category-sidebar'
import { FeatureSidebar } from '@/sections/courses/_components/course-list-sidebar/_components/feature-sidebar'
import { InstructorSidebar } from '@/sections/courses/_components/course-list-sidebar/_components/instructor-sidebar'
import { LevelSidebar } from '@/sections/courses/_components/course-list-sidebar/_components/level-sidebar'
import { PriceSidebar } from '@/sections/courses/_components/course-list-sidebar/_components/price-sidebar'
import { RatingSidebar } from '@/sections/courses/_components/course-list-sidebar/_components/rating-sidebar'

type Props = {
  categories: ICategory[]
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

const CourseListSidebar = ({
  categories,
  setDataFilters,
  dataFilters,
}: Props) => {
  return (
    <div className="tf-sidebar course">
      {/*Danh mục*/}
      <CategorySidebar
        categories={categories || []}
        dataFilters={dataFilters}
        setDataFilters={setDataFilters}
      />

      {/*Đánh giá*/}
      <RatingSidebar
        dataFilters={dataFilters}
        setDataFilters={setDataFilters}
      />

      {/*Người hướng dẫn*/}
      <InstructorSidebar />

      {/*Cấp độ*/}
      <LevelSidebar dataFilters={dataFilters} setDataFilters={setDataFilters} />

      {/*Giá*/}
      <PriceSidebar dataFilters={dataFilters} setDataFilters={setDataFilters} />

      {/*Feature*/}
      <FeatureSidebar
        dataFilters={dataFilters}
        setDataFilters={setDataFilters}
      />
    </div>
  )
}

export default CourseListSidebar
