'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import 'react-quill/dist/quill.snow.css'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import { useGetCourseOverview } from '@/hooks/instructor/course/useCourse'

import 'react-circular-progressbar/dist/styles.css'

import Swal from 'sweetalert2'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import CourseObjective from '@/sections/instructor/_components/courses-update/_components/course-objective'
import CourseOverView from '@/sections/instructor/_components/courses-update/_components/course-over-view'
import CourseStructure from '@/sections/instructor/_components/courses-update/_components/course-structure'
import FilmEditing from '@/sections/instructor/_components/courses-update/_components/film'
import CourseChapterTab from '@/sections/instructor/_components/courses-update/course-chapter-tab'

type GroupId = 'planning' | 'content'

type ActiveTabs = {
  planning: string | null
  content: string | null
}

const groups = [
  {
    id: 'planning' as GroupId,
    title: 'Lên kế hoạch & lợi ích của khoá học',
    tabs: [
      { id: 'course_objectives', label: 'Mục tiêu khoá học' },
      { id: 'structure', label: 'Cấu trúc khóa học' },
    ],
  },
  {
    id: 'content' as GroupId,
    title: 'Tạo nội dung của bạn',
    tabs: [
      { id: 'film', label: 'Biên tập' },
      { id: 'course_overview', label: 'Trang đích của khóa học' },
      { id: 'course_curriculum', label: 'Chương trình giảng dạy' },
    ],
  },
]

const CourseUpdateView = ({ slug }: { slug: string }) => {
  const { user } = useAuthStore()
  const router = useRouter()

  const [activeGroup, setActiveGroup] = useState<GroupId>('planning')
  const [activeTabs, setActiveTabs] = useState<ActiveTabs>({
    planning: 'course_objectives',
    content: null,
  })

  const [courseStatus, setCourseStatus] = useState<string>('draft')

  const { data: courseOverviewData, isLoading: isCourseOverviewLoading } =
    useGetCourseOverview(slug)

  useEffect(() => {
    if (
      !isCourseOverviewLoading &&
      user?.id !== courseOverviewData?.data?.user_id
    ) {
      router.push('/forbidden')
    }
    setCourseStatus(courseOverviewData?.data.status)
  }, [user, courseOverviewData, isCourseOverviewLoading, router])

  if (isCourseOverviewLoading) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  const handleTabClick = (groupId: GroupId, tabId: string) => {
    setActiveGroup(groupId)
    setActiveTabs((prev) => ({
      ...prev,
      [groupId]: tabId,
    }))
  }

  const courseHandleSubmit = () => {
    Swal.fire({
      title: 'Xác nhận gửi yêu cầu kiểm duyệt',
      text: 'Bạn có chắc chắn muốn gửi yêu cầu kiểm duyệt khoá học này?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    })
  }

  return (
    <div className="px-5 py-6">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">
          Cập nhật nội dung khoá học: {courseOverviewData?.data.name}
        </h3>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <div>
              {groups.map((group) => (
                <div key={group.id} className="mb-8">
                  <h1 className="mb-4 text-base font-bold">{group.title}</h1>
                  <div className="flex flex-col gap-2 rounded-lg border-2 border-dashed p-4">
                    {group.tabs.map((tab) => (
                      <div
                        key={tab.id}
                        onClick={() => {
                          handleTabClick(group.id, tab.id)
                        }}
                        className={`flex cursor-pointer items-center justify-between rounded p-2 transition-all ${
                          activeGroup === group.id &&
                          activeTabs[group.id] === tab.id
                            ? 'border-l-4 border-orange-500 bg-orange-50'
                            : 'bg-white'
                        }`}
                      >
                        <span
                          className={`${
                            activeGroup === group.id &&
                            activeTabs[group.id] === tab.id
                              ? 'font-bold text-orange-500'
                              : 'text-gray-700'
                          }`}
                        >
                          {tab.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border-2 border-dashed p-4">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h1 className="mb-4 text-base font-bold">Điều kiện</h1>
                <div className="font-bold" style={{ width: 50, height: 50 }}>
                  <CircularProgressbar
                    value={10}
                    text={`${10}%`}
                    strokeWidth={3}
                    styles={buildStyles({
                      pathColor: `#FA802B`,
                      textColor: '#FA802B',
                      trailColor: '#D6D6D6',
                    })}
                  />
                </div>
              </div>
              <Sheet>
                <SheetTrigger>
                  <Button type="button"> Xem chi tiết</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Các tiêu chí chưa hoàn thành</SheetTitle>
                    <SheetDescription>
                      <Alert variant="destructive" className="mb-4">
                        <AlertTitle className="mb-4">
                          Chưa đáp ứng điều kiện!
                        </AlertTitle>
                        <AlertDescription>ahihi</AlertDescription>
                      </Alert>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <Button
              disabled={['pending', 'approved'].includes(courseStatus)}
              className="mt-4"
              onClick={courseHandleSubmit}
            >
              {courseStatus === 'rejected'
                ? 'Gửi lại thông tin khoá học'
                : 'Gửi yêu cầu kiểm duyệt'}
            </Button>
          </div>
          <div className="col-span-9 rounded border bg-white p-4 shadow-lg">
            {activeGroup === 'planning' && (
              <>
                {activeTabs.planning === 'course_objectives' && (
                  <CourseObjective courseObjective={courseOverviewData?.data} />
                )}
                {activeTabs.planning === 'structure' && <CourseStructure />}
              </>
            )}

            {activeGroup === 'content' && (
              <>
                {activeTabs.content === 'film' && <FilmEditing />}
                {activeTabs.content === 'course_overview' && (
                  <CourseOverView courseOverView={courseOverviewData?.data} />
                )}
                {activeTabs.content === 'course_curriculum' && (
                  <CourseChapterTab
                    slug={slug}
                    chapters={courseOverviewData?.data.chapters}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseUpdateView
