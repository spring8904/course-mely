import AuthWithGoogle from '@/components/common/AuthWithGoogle'
import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/configs/formControls'
import Image from 'next/image'

const SignupView = () => {
  return (
    <div className="bg-[url('https://s3-alpha-sig.figma.com/img/dc1f/d94d/f6062d52cb24787dd4070f8f28665f00?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msXWjHCzmyRLCRoMTIKW7oM533gYO7PoBUSAyzxWA-rWbiHdWdQ3UQEpWeCEfK-LpPfzoHuC0T2EQxWeRhLynYBABBRzTB2O3d-YgIiBSivaicFtCFu67IGcuBy-PkKehS8N7Ban0N~cpmYaogTCg4kI7ZM4sfn1hoqIoCZ7ocN3d8yQejR8Z8yKOzvRuxCZ5ImeDoPWX8ziaG-eCr1PLnCl1XPU81slZ~jkN8n7Hc2Eqj~lPO~o0NQswf3vXx0-Cr6DNgHMv~TumtAF46eM4mE2hqP1dY7klGy7NxSuwDMT-GPqoS33LJLeKNXKpqwXnbhEIVaC13t2Iz2wzIagiQ__')] bg-cover bg-center py-16">
      <div className="mx-auto flex w-2/3 space-x-20 rounded-2xl bg-white px-10 py-16">
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

export default SignupView
