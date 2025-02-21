import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  ChangePasswordPayload,
  changePasswordSchema,
} from '@/validations/change-password'
import { useChangePassword } from '@/hooks/change-password/useChangePassword'

const PassWordView = () => {
  const { mutate } = useChangePassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      comfim_new_password: '',
    },
  })
  const onSubmit = (data: ChangePasswordPayload) => {
    mutate(data)
    console.log(data)
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
            Current Password
          </label>
          {errors.old_password && (
            <span className="text-danger">{errors.old_password.message}</span>
          )}
        </fieldset>
        <fieldset className="tf-field">
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
            New Password
          </label>
          {errors.new_password && (
            <span className="text-danger">{errors.new_password.message}</span>
          )}
        </fieldset>
        <fieldset className="tf-field">
          <input
            className="tf-input style-1"
            id="field4"
            type="password"
            placeholder=""
            tabIndex={2}
            defaultValue=""
            aria-required="true"
            {...register('comfim_new_password')}
          />
          <label className="tf-field-label fs-15" htmlFor="field4">
            Re-Type New Password
          </label>
          {errors.comfim_new_password && (
            <span className="text-danger">
              {errors.comfim_new_password.message}
            </span>
          )}
        </fieldset>
        <button type="submit" className="tf-btn">
          Update Password <i className="icon-arrow-top-right"></i>
        </button>
      </form>
    </div>
  )
}

export default PassWordView
