'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useForm } from 'react-hook-form'

import { IAuthData } from '@/types'
import { signupFormFieldList } from '@/configs'
import { useSignUp } from '@/hooks/auth/sign-up/useSignUp'

import FormField from '@/components/common/FormField'
import PageImage from '@/components/common/PageImage'
import SocialLogin from '@/components/common/SocialLogin'
import SubmitButton from '@/components/common/SubmitButton'

const SignupView = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>()
  const { mutate, status } = useSignUp()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const isPending = status === 'pending'

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <div className="main-content page-register">
      <section className="section-page-register login-wrap tf-spacing-4">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6">
              <PageImage
                src="/assets/images/page-title/page-title-home2-2.jpg"
                alt="page-title-home"
                author="Ali Tufan"
                subAuthor="Founder & CEO"
              />
            </div>
            <div className="col-lg-6">
              <div className="content-right">
                <h2
                  className="login-title fw-7 wow fadeInUp font-manrope"
                  data-wow-delay="0s"
                >
                  Đăng ký tài khoản
                </h2>
                <div className="register">
                  <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                    Bạn đã có tài khoản?
                  </p>
                  <Link
                    href="/sign-in"
                    className="fw-5 fs-15 wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    Đăng nhập
                  </Link>
                </div>
                <form action="#" className="form-login" onSubmit={onSubmit}>
                  {signupFormFieldList.map(
                    ({ id, type, name, label, rules }) => (
                      <FormField
                        id={id}
                        type={type}
                        name={name}
                        label={label}
                        key={name}
                        register={register}
                        error={errors[name]?.message as string}
                        rules={rules}
                      />
                    )
                  )}
                  <SubmitButton text="Đăng ký" disabled={isPending} />
                </form>
                <p className="fs-15 wow fadeInUp" data-wow-delay="0s">
                  Hoặc
                </p>
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupView
