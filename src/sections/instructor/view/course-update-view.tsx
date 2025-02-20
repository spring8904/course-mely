'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import 'react-quill/dist/quill.snow.css'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import {
  useGetCourseOverview,
  useSubmitCourse,
  useValidateCourse,
} from '@/hooks/instructor/course/useCourse'

import 'react-circular-progressbar/dist/styles.css'

import Link from 'next/link'
import { Accordion } from '@radix-ui/react-accordion'
import Swal from 'sweetalert2'

import { formatPercentage } from '@/lib/common'
import { cn } from '@/lib/utils'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
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
  const [progress, setProgress] = useState<number>(0)

  const { data: courseOverviewData, isLoading: isCourseOverviewLoading } =
    useGetCourseOverview(slug)
  const { data: validateData, isLoading: isValidateLoading } =
    useValidateCourse(slug)
  const { mutate: submitCourse, isPending: isSubmitCoursePending } =
    useSubmitCourse()

  useEffect(() => {
    if (
      !isCourseOverviewLoading &&
      user?.id !== courseOverviewData?.data?.user_id
    ) {
      router.push('/forbidden')
    }
    setCourseStatus(courseOverviewData?.data.status)
    setProgress(validateData?.data.progress || 0)
  }, [user, courseOverviewData, isCourseOverviewLoading, router, validateData])

  if (isCourseOverviewLoading || isValidateLoading) {
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
    if (isSubmitCoursePending) return

    Swal.fire({
      title: 'Xác nhận gửi yêu cầu kiểm duyệt',
      text: 'Bạn có chắc chắn muốn gửi yêu cầu kiểm duyệt khoá học này?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        submitCourse(slug)
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
          <div className="col-span-4 xl:col-span-3">
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
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded p-2 transition-all ${
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
                        {validateData?.data.completion_status[tab.id]
                          ?.status === true ? (
                          <CheckCircle
                            className={cn('size-5 text-green-500')}
                          />
                        ) : (
                          validateData?.data.completion_status[tab.id]
                            ?.status === false && (
                            <XCircle className={cn('size-5 text-red-500')} />
                          )
                        )}
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
                    value={validateData?.data.progress || 0}
                    text={formatPercentage(validateData?.data.progress || 0)}
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
                <SheetTrigger asChild>
                  <Button
                    disabled={progress === 100 || isSubmitCoursePending}
                    type="button"
                  >
                    Xem chi tiết
                  </Button>
                </SheetTrigger>
                <SheetContent
                  aria-describedby={undefined}
                  className="overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Các tiêu chí chưa hoàn thành</SheetTitle>
                  </SheetHeader>

                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-4 py-4"
                  >
                    {Object.entries(validateData?.data.completion_status).map(
                      ([key, value]) => {
                        const typedValue = value as {
                          status: boolean
                          errors: string[]
                        }

                        if (!typedValue.status) {
                          return (
                            <AccordionItem key={key} value={key}>
                              <AccordionTrigger className="rounded-lg">
                                {(() => {
                                  switch (key) {
                                    case 'course_objectives':
                                      return 'Mục tiêu khoá học'
                                    case 'course_overview':
                                      return 'Trang đích của khóa học'
                                    case 'course_curriculum':
                                      return 'Chương trình giảng dạy'
                                    default:
                                      return ''
                                  }
                                })()}
                              </AccordionTrigger>
                              {typedValue.errors.map((error, index) => (
                                <AccordionContent
                                  key={index}
                                  className="rounded-lg text-sm text-red-500"
                                >
                                  {error}
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          )
                        }
                      }
                    )}
                  </Accordion>
                </SheetContent>
              </Sheet>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/instructor/courses/">
                <Button variant="outline">Khoá học của tôi</Button>
              </Link>
              <Button
                disabled={
                  ['pending', 'approved'].includes(courseStatus) ||
                  isSubmitCoursePending ||
                  progress < 100
                }
                onClick={courseHandleSubmit}
              >
                {courseStatus === 'rejected'
                  ? 'Gửi lại thông tin khoá học'
                  : 'Gửi yêu cầu kiểm duyệt'}
              </Button>
            </div>
          </div>
          <div className="col-span-8 rounded border bg-white p-4 shadow-lg xl:col-span-9">
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
                    courseStatus={courseStatus as string}
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
