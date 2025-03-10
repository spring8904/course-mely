'use client'
import CountUp from 'react-countup'
import { Card, CardContent } from '@/components/ui/card'
import { useGetOverviewStatistics } from '@/hooks/instructor/use-statistic'
import { formatCurrency } from '@/lib/common'
import {
  CircleDollarSign,
  Folder,
  Loader2,
  Star,
  UsersRound,
} from 'lucide-react'

const OverviewStatistics = () => {
  const { data: overviewStatistics, isLoading } = useGetOverviewStatistics()

  return (
    <div className="grid h-full grid-cols-2 items-stretch gap-3 lg:gap-5">
      <Card className="channel-stats-bg flex h-full flex-col justify-between gap-6 bg-cover bg-[left_top_-1.7rem] bg-no-repeat">
        <div className="ms-5 mt-4 inline-flex size-14 items-center justify-center rounded-xl bg-primary/15">
          <Folder className="text-primary" />
        </div>

        <CardContent className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="mb-3 ml-3 animate-spin text-muted-foreground" />
            ) : (
              <CountUp end={overviewStatistics?.totalCourse ?? 0} />
            )}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Tổng số khóa học
          </span>
        </CardContent>
      </Card>

      <Card className="channel-stats-bg flex h-full flex-col justify-between gap-6 bg-cover bg-[left_top_-1.7rem] bg-no-repeat">
        <div className="ms-5 mt-4 inline-flex size-14 items-center justify-center rounded-xl bg-primary/15">
          <CircleDollarSign className="text-primary" />
        </div>
        <CardContent className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="mb-3 ml-3 animate-spin text-muted-foreground" />
            ) : (
              <CountUp
                end={
                  overviewStatistics?.totalRevenue
                    ? +overviewStatistics.totalRevenue
                    : 0
                }
                formattingFn={(value) => formatCurrency(value)}
                separator="."
              />
            )}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Tổng doanh thu
          </span>
        </CardContent>
      </Card>

      <Card className="channel-stats-bg flex h-full flex-col justify-between gap-6 bg-cover bg-[left_top_-1.7rem] bg-no-repeat">
        <div className="ms-5 mt-4 inline-flex size-14 items-center justify-center rounded-xl bg-primary/15">
          <UsersRound className="text-primary" />
        </div>

        <CardContent className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="mb-3 ml-3 animate-spin text-muted-foreground" />
            ) : (
              <CountUp
                end={overviewStatistics?.totalEnrollments ?? 0}
                separator="."
              />
            )}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Số học viên
          </span>
        </CardContent>
      </Card>

      <Card className="channel-stats-bg flex h-full flex-col justify-between gap-6 bg-cover bg-[left_top_-1.7rem] bg-no-repeat">
        <div className="ms-5 mt-4 inline-flex size-14 items-center justify-center rounded-xl bg-primary/15">
          <Star className="text-primary" />
        </div>

        <CardContent className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="mb-3 ml-3 animate-spin text-muted-foreground" />
            ) : (
              <CountUp
                end={
                  overviewStatistics?.averageRating
                    ? +overviewStatistics.averageRating
                    : 0
                }
                decimals={1}
                decimal=","
              />
            )}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Đánh giá trung bình
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
export default OverviewStatistics
