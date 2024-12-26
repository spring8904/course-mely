import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatMinutesToHour } from '@/lib/utils'
import { courseData } from '@/sections/home/data/data'
import { Avatar } from '@radix-ui/react-avatar'
import {
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clock5,
  Star,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CourseListProps {
  className?: string
  title: string
  description?: string
  // courses: ICourse[]
}

const CourseList = ({ title, description, className }: CourseListProps) => {
  return (
    <div className={cn('w-full bg-[#FAFAFC] pb-10 pt-7', className)}>
      <div
        className={cn(
          'container mx-auto flex flex-col gap-8 p-3',
          'lg:p-5',
          'xl:p-10',
        )}
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold leading-6">{title}</h3>

            <div>
              <Button
                size="icon"
                className="size-[50px] rounded-full"
                variant="outline"
              >
                <ChevronLeft className="!size-6" strokeWidth={3} />
              </Button>

              <Button
                size="icon"
                className="ml-2 size-[50px] rounded-full"
                variant="outline"
              >
                <ChevronRight className="!size-6" strokeWidth={3} />
              </Button>
            </div>
          </div>

          <p>{description}</p>
        </div>

        <div
          className={cn(
            'grid grid-cols-1 gap-2',
            'md:grid-cols-2 md:gap-4',
            'lg:grid-cols-3 lg:gap-6',
          )}
        >
          {courseData?.map((course) => (
            <Card
              key={course.id}
              className="rounded-lg border-none"
              style={{
                boxShadow:
                  '0px 4px 6px -2px rgba(16, 24, 40, 0.25), 0px 12px 16px -4px rgba(16, 24, 40, 0.25)',
              }}
            >
              <CardContent className="flex flex-col p-6">
                <div className="relative h-60">
                  <Image
                    // src="https://s3-alpha-sig.figma.com/img/52dc/217a/00d7a1cbbce25c955a5fab2180048f24?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iEUXpb2~h5cck6t8tCRnJPpfRl0AY2hpCZRFEJD1lKxKiAjcHF95AYndWk0krDIu6ULkE19FW0KBK9rD5tioj5bgBOco0IcUcyYx1kTMXI5o~-sh2Du-Zy1UgaSq1IPwEU7rx2R0feImFmGjFsk9UwUGOdcXciS0tl4ZbJqFM9~Jhlfmea51i2vpQSSFO63O-5it8q284-mHKSgjrD21yGi1Vn~A0znwK1MUti9NhQHSINkr85WwWLhP-UI1AwjyYqH0aaii~mebW6Tm1CSZ6ZG6ka~RfT-TzMeOB21SMMi83srDxeP4BnVS9zJbufVallGb~2le8LG4acmJv~5S7A__"
                    src={course.thumbnail!}
                    alt={course.name}
                    fill
                  />

                  <span className="absolute right-3 top-3 rounded bg-white px-[10px] py-[6px] text-sm font-medium text-[#667085]">
                    {course.level}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star fill="#FC6441" className="size-3 text-primary" />
                    <Star fill="#FC6441" className="size-3 text-primary" />
                    <Star fill="#FC6441" className="size-3 text-primary" />
                    <Star fill="#FC6441" className="size-3 text-primary" />
                    <Star fill="#FC6441" className="size-3 text-primary" />

                    <span className="text-sm font-semibold">4.3k</span>
                  </div>

                  <span className="text-sm font-medium">Web Develop</span>
                </div>

                <h4 className="mt-1 line-clamp-1 text-2xl font-semibold text-[#101828]">
                  {course.name}
                </h4>

                <div className="mt-1 flex gap-4 text-base font-semibold text-primary">
                  <span
                    className={cn(
                      course.priceSale && 'text-[#4D5756] line-through',
                    )}
                  >
                    {course.price} đ
                  </span>
                  {course.priceSale && <span>{course.priceSale} đ</span>}
                </div>

                <div className="mt-1 flex items-center justify-between rounded-[1px] border border-dashed border-black px-3 py-2">
                  <div className="flex items-center gap-1 text-[#101828]">
                    <Clock5 />
                    <span className="text-sm font-semibold">
                      {formatMinutesToHour(course.duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#101828]">
                    <CirclePlay />
                    <span className="text-sm font-semibold">20</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#101828]">
                    <Users />
                    <span className="text-sm font-semibold">
                      {course.totalStudent}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11 overflow-hidden rounded-full border-2 border-primary">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="text-sm font-medium">
                      <p>Văn Tùng</p>
                      <p className="text-[#667085]">Tham gia 2021</p>
                    </div>
                  </div>

                  <Link
                    href={`/course/${course.slug}`}
                    className={cn(buttonVariants({ variant: 'default' }))}
                  >
                    Tham gia
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CourseList
