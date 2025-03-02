import { Loader2 } from 'lucide-react'

type Props = {
  text: string
  disabled: boolean
}

const SubmitButton = ({ text, disabled }: Props) => (
  <button
    className={`button-submit tf-btn w-100 wow fadeInUp ${disabled ? 'disable' : ''}`}
    data-wow-delay="0s"
    type="submit"
    disabled={disabled}
  >
    {text}
    {disabled ? (
      <Loader2 className="animate-spin" />
    ) : (
      <i className="icon-arrow-top-right" />
    )}
  </button>
)

export default SubmitButton
