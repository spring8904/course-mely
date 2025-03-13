'use client'

import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  ChangePasswordPayload,
  changePasswordSchema,
} from '@/validations/change-password'
import { useChangePassword } from '@/hooks/change-password/useChangePassword'
import { zodResolver } from '@hookform/resolvers/zod'

const PassWordView = () => {
  const { mutate, isPending } = useChangePassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  })
  const onSubmit = (data: ChangePasswordPayload) => {
    mutate(data)
  }
  return (
    <div className="widget-content-inner">
      <form onSubmit={handleSubmit(onSubmit)} className="shop-checkout">
        <fieldset className="tf-field">
          <input
            className="tf-input style-1"
            id="field4"
            type="password"
            placeholder=""
            tabIndex={2}
            defaultValue=""
            aria-required="true"
            {...register('old_password')}
          />
          <label className="tf-field-label fs-15" htmlFor="field4">
            Mật khẩu hiện tại
          </label>
          {errors.old_password && (
            <span className="text-danger">{errors.old_password.message}</span>
          )}
        </fieldset>
        <fieldset className="tf-field mt-2">
          <input
            className="tf-input style-1"
            id="field4"
            type="password"
            placeholder=""
            tabIndex={2}
            defaultValue=""
            aria-required="true"
            {...register('new_password')}
          />
          <label className="tf-field-label fs-15" htmlFor="field4">
            Mật khẩu mới
          </label>
          {errors.new_password && (
            <span className="text-danger">{errors.new_password.message}</span>
          )}
        </fieldset>
        <fieldset className="tf-field mt-2">
          <input
            className="tf-input style-1"
            id="field4"
            type="password"
            placeholder=""
            tabIndex={2}
            defaultValue=""
            aria-required="true"
            {...register('confirm_new_password')}
          />
          <label className="tf-field-label fs-15" htmlFor="field4">
            Nhập lại mật khẩu mới
          </label>
          {errors.confirm_new_password && (
            <span className="text-danger">
              {errors.confirm_new_password.message}
            </span>
          )}
        </fieldset>
        <button type="submit" className="tf-btn mt-3">
          {isPending && <Loader2 className="animate-spin" />}Cập nhật mật khẩu{' '}
          <i className="icon-arrow-top-right"></i>
        </button>
      </form>
    </div>
  )
}

export default PassWordView
