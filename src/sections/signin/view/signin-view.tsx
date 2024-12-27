import AuthWithGoogle from '@/components/common/AuthWithGoogle'
import DividerWithText from '@/components/common/DividerWithText'
import CommonForm from '@/components/common/Form'
import WelcomeSection from '@/components/common/WelcomeSection'
import { loginFormControls } from '@/configs/formControls'

const SigninView = () => {
  return (
    <div className="bg-[url('https://s3-alpha-sig.figma.com/img/dc1f/d94d/f6062d52cb24787dd4070f8f28665f00?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msXWjHCzmyRLCRoMTIKW7oM533gYO7PoBUSAyzxWA-rWbiHdWdQ3UQEpWeCEfK-LpPfzoHuC0T2EQxWeRhLynYBABBRzTB2O3d-YgIiBSivaicFtCFu67IGcuBy-PkKehS8N7Ban0N~cpmYaogTCg4kI7ZM4sfn1hoqIoCZ7ocN3d8yQejR8Z8yKOzvRuxCZ5ImeDoPWX8ziaG-eCr1PLnCl1XPU81slZ~jkN8n7Hc2Eqj~lPO~o0NQswf3vXx0-Cr6DNgHMv~TumtAF46eM4mE2hqP1dY7klGy7NxSuwDMT-GPqoS33LJLeKNXKpqwXnbhEIVaC13t2Iz2wzIagiQ__')] bg-cover bg-center py-16">
      <div className="mx-auto flex w-2/3 items-center space-x-20 rounded-2xl bg-white px-10 py-16">
        <WelcomeSection />

        <div className="flex flex-1 flex-col items-center space-y-5">
          <AuthWithGoogle content="Đăng nhập với Google" />

          <DividerWithText text="Hoặc đăng nhập với email" />

          <CommonForm
            formControls={loginFormControls}
            btnText="Đăng nhập"
            isLogin={true}
          />
        </div>
      </div>
    </div>
  )
}

export default SigninView
