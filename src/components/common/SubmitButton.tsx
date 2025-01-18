const SubmitButton = ({ text }: { text: string }) => (
  <button
    className="button-submit tf-btn w-100 wow fadeInUp"
    data-wow-delay="0s"
    type="submit"
  >
    {text}
    <i className="icon-arrow-top-right" />
  </button>
)

export default SubmitButton
