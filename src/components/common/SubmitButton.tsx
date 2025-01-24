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
    {disabled ? (
      `Loading...`
    ) : (
      <>
        {text}
        <i className="icon-arrow-top-right" />
      </>
    )}
  </button>
)

export default SubmitButton
