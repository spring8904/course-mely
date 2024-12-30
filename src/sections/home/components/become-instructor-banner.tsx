import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const BecomeInstructorBanner = () => {
  return (
    <div
      className={cn(
        'bg-[url(https://s3-alpha-sig.figma.com/img/dc1f/d94d/f6062d52cb24787dd4070f8f28665f00?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msXWjHCzmyRLCRoMTIKW7oM533gYO7PoBUSAyzxWA-rWbiHdWdQ3UQEpWeCEfK-LpPfzoHuC0T2EQxWeRhLynYBABBRzTB2O3d-YgIiBSivaicFtCFu67IGcuBy-PkKehS8N7Ban0N~cpmYaogTCg4kI7ZM4sfn1hoqIoCZ7ocN3d8yQejR8Z8yKOzvRuxCZ5ImeDoPWX8ziaG-eCr1PLnCl1XPU81slZ~jkN8n7Hc2Eqj~lPO~o0NQswf3vXx0-Cr6DNgHMv~TumtAF46eM4mE2hqP1dY7klGy7NxSuwDMT-GPqoS33LJLeKNXKpqwXnbhEIVaC13t2Iz2wzIagiQ__)]',
        'w-full bg-cover bg-bottom'
      )}
    >
      <div
        className={cn(
          'container mx-auto grid grid-cols-2',
          'lg:p-5',
          'xl:p-10'
        )}
      >
        <div className="relative">
          <Image
            src={
              'https://s3-alpha-sig.figma.com/img/4ade/2e3a/9407f47d6b393763bbb6ee0ec27a4cb2?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D4pU5LH~yvYLqNEKtCjqBB7026R2TyOWGjqP~OgDULldpIUxbNJbd3vClMhBgA-zendjvYockUEqpqDRR4WqXTkbcIG3TKri0jiVnzNvruGh5JaGkflNAJPr8AIHhz-tO-XEslz~BbyWPrSR4-1wygN8AOwj27YwrzDhw5reMP0HIC6EyUvEzHAe5T51MHDywPFZrg7WFb7PWqeBVXB5Tir51THRTlaHJsNX~DrrJbGPGAYTN78EzVaVY1vgraIwMtKsxabPcYbZisNZYQK1MYTbgCgmz18Hui5lf1yn-6m0YzcdF7tLUo~KNpRZQ1gvkGVPmFZd4CXFiADTOUWuGw__'
            }
            alt="banner"
            fill
          />
        </div>

        <div className="py-24 pl-5">
          <h3 className="text-4xl font-bold leading-[47px]">
            Bạn muốn chia sẻ kiến thức của mình?
          </h3>

          <p>
            Hãy trở thành giảng viên và bắt đầu chia sẻ kiến thức của bạn đến
            với mọi người. Tham gia ngay để khám phá tiềm năng của bạn!
          </p>

          <Link
            href=""
            className={cn(buttonVariants({ variant: 'default' }), 'mt-4')}
          >
            Tham gia ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
export default BecomeInstructorBanner
