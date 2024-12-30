import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <div
      className={cn(
        'bg-[url(https://s3-alpha-sig.figma.com/img/f7e3/7646/316ba60e153460b21caab6214cc846ad?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HzsCWJZJu6WOJ7cVDD08QnxJYXYeAXa0Dx82ptAzlf8pK4kv3Apms8yCswjKB2FPf1zK5DIasHprrKpMqN2lgs4-TlOdFxxrcTo1YoBbinMJ-j0dr4hVRIG-IS5WTGJ1tA1VMYE1g-kq0jza7e4YHLvq5ReTjTuq~9qNza6y3Vo0r7~dV21V15o0TPbjgDz1wrO5Iw9TiY~CJ3kcwkPZzVZ5Na2nyeA4Vx7xhjV77c7RGV-Pe~piuxOGIifkZLVdQ80FTsAIrF~rcUh2VuQoOdTTglqDrlXZELGhy94u0G-wn~yVPEVjdp9bkzhbf1EFNNBC6ovm5X~QHStOA6bkBA__)]',
        'grid grid-cols-1 bg-cover bg-bottom',
        'lg:grid-cols-2'
      )}
    >
      <div
        className={cn(
          'pb-8 pl-[120px] pr-10 pt-[70px]',
          'lg:pb-[95px] lg:pr-[104px]'
        )}
      >
        <h3 className="text-[32px] font-semibold leading-[50px]">
          Học ReactJS Miễn Phí!
        </h3>

        <p className="mt-2 text-base font-semibold leading-8">
          Khoá học ReactJS từ cơ bản tới nâng cao. Kết quả của khoá học này là
          bạn có thể làm hầu hết các dự án thường gặp với ReactJS
        </p>

        <Link
          href=""
          className={cn(buttonVariants({ variant: 'default' }), 'mt-5')}
        >
          Đăng ký ngay
        </Link>
      </div>

      <div className="relative">
        <Image
          src="https://s3-alpha-sig.figma.com/img/2ef9/00fe/b2fb015d9f5f4bf59597561cd9f47544?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J2NknaXxD-zCT4lxm7UNIlFcPihvx~CBoMcZohwwogx83T~rCxcRtwEXM11hk-Yf2aQyfBpdE3haxUXmsDPkQseJ5vuvGGIU2jLG5ZCNqF1JVHlNxm8Z0wQttgprqCSVBZmGxJof96wpm45z9EJp37Owdbfid9C4o9d0ix~5DcOp2PB47itMHficE9WATP~cVjDpZEhMW-MUsOzZH1pvf~EqaefvZ~9EmfAj4zT-8dfOVQy48P7Fdn-EyRaLQINHtA8KKb~S1qyKcsxRJhme8UAOq98ShhhcLo-0y4eA7-S906xCo2iyRioYc09zRTQKCN1OXzl~MGSXpg~NhVycAQ__"
          className="object-cover"
          alt="Banner"
          fill
        />
      </div>
    </div>
  )
}
export default Banner
