import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/configs/formControls'
import Image from 'next/image'

const AuthWithGoogle = ({ content }: { content: string }) => (
  <div className="flex w-full cursor-pointer items-center space-x-4 rounded-lg border p-1 hover:bg-[#F5F5F5]">
    <div className="rounded-lg bg-[#E93E30] p-2">
      <Image
        src="/images/google-icon.png"
        alt="google-icon"
        width={24}
        height={24}
      />
    </div>
    <div>
      <p className="text-[#5D5A6F]">{content}</p>
    </div>
  </div>
)

const SignUp = () => {
  return (
    <div className="bg-[url('/images/auth-background.png')] bg-cover bg-center py-16">
      <div className="mx-auto flex w-2/3 space-x-20 rounded-2xl bg-white px-10 py-16">
        <div>
          <div className="flex items-center space-x-2">
            <Image
              src="/images/Logo.png"
              alt="CourseHUB logo"
              width={40}
              height={40}
            />
            <h2 className="line text-2xl font-bold">CourseHUB</h2>
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

        <div className="flex flex-1 flex-col items-center space-y-5">
          <AuthWithGoogle content="Đăng ký với Google" />

          <div className="flex w-fit items-center space-x-6">
            <hr className="w-5 flex-1 border-[#5D5A6F]" />
            <span className="text-[#5D5A6F]">Hoặc đăng ký với email</span>
            <hr className="w-5 flex-1 border-[#5D5A6F]" />
          </div>

          <CommonForm formControls={registerFormControls} btnText="Đăng ký" />
        </div>
      </div>
    </div>
  )
}

export default SignUp
