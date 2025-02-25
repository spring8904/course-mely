'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

import { useGetCourseListOfUser } from '@/hooks/instructor/course/useCourse'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ModalLoading from '@/components/common/ModalLoading'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import DialogLiveStreamCreate from '@/sections/instructor/components/course-detail/_components/dialog-live-stream-create'

const getLocalizedLevel = (level: string) => {
  switch (level) {
    case 'advanced':
      return 'Chuyên sâu'
    case 'intermediate':
      return 'Nâng cao'
    case 'beginner':
      return 'Dễ'
    default:
      return 'Không xác định'
  }
}

const CourseDetailView = ({ slug }: { slug: string }) => {
  const [courseData, setCourseData] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openCreateLiveSteam, setIsOpenCreateLiveStream] = useState(false)

  const { data: courseListOfUser, isLoading } = useGetCourseListOfUser(slug)

  useEffect(() => {
    if (courseListOfUser) {
      setCourseData(courseListOfUser?.data.course)
      setStudentData(courseListOfUser.data.student_progress)
    }
  }, [courseListOfUser, courseData, studentData])

  const filteredData = studentData?.filter((student: any) => {
    const searchFields = ['user_name', 'progress']
    return searchFields.some((field) =>
      student[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
  })

  const columns: ColumnDef<any[]>[] = [
    {
      header: 'STT',
      accessorFn: (_row, index) => index + 1,
      cell: ({ getValue }: any) => (
        <div className="text-sm font-medium text-gray-900">{getValue()}</div>
      ),
      size: 50,
    },
    {
      accessorKey: 'user_name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
      cell: ({ row }: any) => {
        const student = row.original
        return (
          <div className="flex items-center gap-2">
            <Image
              alt={student.user_name}
              className="rounded-full object-cover"
              src={student.user_avatar || ''}
              width={30}
              height={30}
            />
            <p className="text-sm font-medium text-gray-900">
              {student.user_name}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: 'progress_percent',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Tiến độ" />
      ),
      cell: ({ row }: any) => {
        const student = row.original
        return (
          <p className="text-sm font-medium text-gray-900">
            {student.progress_percent} %
          </p>
        )
      },
    },
    {
      accessorKey: 'enrolled_at',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Đã tham gia" />
      ),
      cell: ({ row }: any) => {
        const student = row.original
        return student.enrolled_at ? (
          <Badge variant="info">
            {format(new Date(student.enrolled_at), 'dd/MM/yyyy')}
          </Badge>
        ) : (
          <Badge variant="secondary">Chưa tham gia</Badge>
        )
      },
    },
    {
      accessorKey: 'completed_at',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Hoàn thành" />
      ),
      cell: ({ row }: any) => {
        const student = row.original
        return student.completed_at ? (
          <span className="text-sm font-medium">
            <Badge variant="success">
              {format(new Date(student.completed_at), 'dd/MM/yyyy')}
            </Badge>
          </span>
        ) : (
          <Badge variant="secondary">Chưa hoàn thành</Badge>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: 'Hành động',
      cell: ({ row }: any) => {
        const student = row.original

        const handleView = () => {
          console.log(`Viewing details for ${student.user_name}`)
        }

        return (
          <Button onClick={handleView}>
            <Eye />
          </Button>
        )
      },
    },
  ]

  if (isLoading) {
    return <ModalLoading />
  }

  return (
    <div className="px-5 py-6">
      <div className="mt-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Chi tiết khoá học: {courseData?.name || ''}
          </h1>
          <div className="flex gap-2">
            <Button className="bg-green-500">Tạo nhóm học tập</Button>
            <Button
              onClick={() => setIsOpenCreateLiveStream(true)}
              className="bg-blue-500"
            >
              Phát trực tiếp
            </Button>
          </div>
        </div>
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-start space-x-3 md:items-center">
              <Image
                src={courseData?.thumbnail || ''}
                alt={courseData?.name}
                className="rounded-lg object-cover shadow"
                width={200}
                height={200}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {courseData?.name}
                </h1>
                <p className="mt-1 text-gray-500">
                  Mã khoá học: {courseData?.code}
                </p>
                <Badge variant="success" className="mt-2">
                  Cấp độ: {getLocalizedLevel(courseData?.level)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800">
              Thông tin chi tiết
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Danh mục:</p>
                <p className="text-gray-800">{courseData?.category?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Giá gốc:</p>
                <p className="text-gray-800">
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(courseData?.price)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Giá giảm:</p>
                <p className="text-gray-800">
                  {courseData?.price_sale === '0.00'
                    ? 'Không áp dụng giảm giá'
                    : Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(courseData?.price_sale)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Học viên tham gia:
                </p>
                <p className="text-gray-800">
                  {courseData?.total_student} học viên
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Chương học:</p>
                <p className="text-gray-800">
                  {courseListOfUser?.data.total_chapter || ''} chương
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Bài học:</p>
                <p className="text-gray-800">
                  {courseListOfUser?.data.total_lesson || ''} bài
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <h1 className="mb-4 text-xl font-bold">Danh sách học viên</h1>
        <DataTable
          isLoading={isLoading}
          columns={columns}
          onSearchChange={setSearchTerm}
          data={filteredData || []}
        />
      </div>
      <div>
        <Link href="/instructor/courses">
          <Button variant="outline">Khoá học của tôi</Button>
        </Link>
      </div>
      {openCreateLiveSteam && (
        <DialogLiveStreamCreate
          open={openCreateLiveSteam}
          onOpenChange={setIsOpenCreateLiveStream}
        />
      )}
    </div>
  )
}

export default CourseDetailView
