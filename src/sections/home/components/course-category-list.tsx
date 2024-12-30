import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Telescope } from 'lucide-react'
import Link from 'next/link'

interface CourseCategoryListProps {
  courseCategories: {
    name: string
    totalCourses: number
  }[]
}

const CourseCategoryList = ({ courseCategories }: CourseCategoryListProps) => {
  return (
    <div className="w-full bg-[#FAFAFC] pb-10 pt-7">
      <div
        className={cn(
          'container mx-auto flex flex-col gap-6 p-3',
          'lg:p-5',
          'xl:p-10'
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-6">
            Khám phá khoá học theo danh mục
          </h3>

          <Link href="" className={buttonVariants({ variant: 'default' })}>
            Đăng ký ngay
          </Link>
        </div>

        <div
          className={cn(
            'grid grid-cols-2 gap-2',
            'md:grid-cols-2 md:gap-4',
            'lg:grid-cols-4 lg:gap-6'
          )}
        >
          {courseCategories?.map((category, i) => (
            <Link
              key={i}
              href={`/courses?category=${category.name}`}
              className="rounded-lg border border-[#E2E8F0] bg-[#FFF]"
            >
              <div
                className={cn(
                  'm-4 flex flex-col items-center gap-6',
                  'md:flex-row md:gap-3',
                  'lg:mt-8 lg:flex-col'
                )}
              >
                <div className="flex size-[104px] items-center justify-center rounded-full bg-[#F6C6C0]">
                  <Telescope className="size-8 text-[#FF6652]" />
                </div>

                <div>
                  <h4 className="text-xl font-bold leading-6">
                    {category.name}
                  </h4>

                  <p className="mt-3 text-[#334155]">
                    {category.totalCourses} Khoá học
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CourseCategoryList
