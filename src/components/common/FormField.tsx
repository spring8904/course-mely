import { RegisterOptions, UseFormRegister } from 'react-hook-form'

import { IAuthData } from '@/types'

type Props = {
  id: string
  type: string
  name: keyof IAuthData
  label: string
  register: UseFormRegister<IAuthData>
  error?: string
  rules?: RegisterOptions<IAuthData, keyof IAuthData>
}

const FormField = ({
  id,
  type,
  name,
  label,
  register,
  error,
  rules,
}: Props) => (
  <div className="cols mb-10 flex flex-col">
    <fieldset className="tf-field wow fadeInUp" data-wow-delay="0s">
      <input
        className="tf-input style-1"
        id={id}
        type={type}
        placeholder=""
        {...register(name, rules)}
        tabIndex={0}
        aria-required="true"
      />
      <label className="tf-field-label fs-15" htmlFor={id}>
        {label}
      </label>
    </fieldset>
    {error && <span className="text-danger w-full text-left">{error}</span>}
  </div>
)

export default FormField
