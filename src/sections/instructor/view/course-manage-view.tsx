import CoursesTable from '../components/course-management/courses-table'

const CourseManageView = () => {
  return (
    <div className="px-5 py-6">
      <div className="mt-2 space-y-6">
        <h1 className="text-xl font-bold">Quản lý khóa học</h1>

        <CoursesTable />
      </div>
    </div>
  )
}

export default CourseManageView
