import { CourseStatus, CourseStatusMap } from '@/types'

import { Badge } from '../ui/badge'

interface CourseStatusBadgeProps {
  status: CourseStatus
}

const CourseStatusBadge = ({ status }: CourseStatusBadgeProps) => {
  const course = CourseStatusMap[status]
  return (
    <Badge className="shrink-0 whitespace-nowrap" variant={course?.badge}>
      {course?.label}
    </Badge>
  )
}
export default CourseStatusBadge
