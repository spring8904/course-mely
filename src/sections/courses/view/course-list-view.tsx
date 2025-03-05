'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { ICourseFilter } from '@/types'
import { useGetCategories } from '@/hooks/category/useCategory'
import { useGetCourses } from '@/hooks/course/useCourse'

import ModalLoading from '@/components/common/ModalLoading'
import { CourseIntro } from '@/sections/courses/_components/course-intro'

import CourseListItem from '../_components/course-list-item'
import CourseListSidebar from '../_components/course-list-sidebar/course-list-sidebar'

const CourseListView = () => {
  const [dataFilters, setDataFilters] = useState<ICourseFilter>({})
  const [forceUpdate, setForceUpdate] = useState<number>(0)

  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetCategories()
  const { data: coursesData, isLoading: coursesDataLoading } =
    useGetCourses(dataFilters)

  useEffect(() => {
    const savedFilters = JSON.parse(
      localStorage.getItem('courseFilters') || '{}'
    )
    setDataFilters(savedFilters)

    const handleFilterUpdate = () => {
      const updatedFilters = JSON.parse(
        localStorage.getItem('courseFilters') || '{}'
      )
      setDataFilters(updatedFilters)
      setForceUpdate((prev) => prev + 1)
    }

    window.addEventListener('courseFiltersUpdated', handleFilterUpdate)

    return () => {
      window.removeEventListener('courseFiltersUpdated', handleFilterUpdate)
    }
  }, [forceUpdate])

  if (categoriesDataLoading)
    return (
      <div className="min-h-screen">
        <ModalLoading />
      </div>
    )

  return (
    <>
      <div className="style-2 has-tags-bg-white">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <CourseIntro />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-0">
        <div className="page-inner tf-spacing-1 pt-0">
          <div className="tf-container">
            <div
              className="tf-mobile-sidebar-btn btn-right"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithMobile"
              aria-controls="offcanvasWithBackdrop"
            >
              <i className="flaticon-setting" />
            </div>
            <div className="row">
              <div className="col-xl-3">
                <CourseListSidebar
                  categories={categoriesData?.data}
                  dataFilters={dataFilters}
                  setDataFilters={setDataFilters}
                />
              </div>
              <div className="col-xl-9">
                {coursesDataLoading ? (
                  <Loader2 className="mx-auto size-8 animate-spin" />
                ) : coursesData && coursesData?.data.length > 0 ? (
                  <CourseListItem
                    coursesData={coursesData}
                    dataFilters={dataFilters}
                    setDataFilters={setDataFilters}
                  />
                ) : (
                  'Danh sách bài học trống...'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseListView
