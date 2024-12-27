import Image from 'next/image'

const WelcomeSection = () => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/Logo.png"
          alt="CourseHUB logo"
          width={40}
          height={40}
        />
        <h2 className="text-2xl font-bold">CourseHUB</h2>
      </div>

      <h1 className="mt-7 max-w-[432px] text-5xl font-bold leading-[56px]">
        Chào mừng bạn đến với nền tảng học tập trực tuyến tại CourseHUB
      </h1>

      <div>
        <Image
          src="/images/auth-img.png"
          alt="auth-img"
          width={332}
          height={336}
          className="mt-3"
        />
      </div>
    </div>
  )
}

export default WelcomeSection
