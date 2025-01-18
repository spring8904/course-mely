type Props = {
  id: string
  type: string
  name: string
  label: string
}

const FormField = ({ id, type, name, label }: Props) => (
  <div className="cols">
    <fieldset
      className={`tf-field field-${name} wow fadeInUp`}
      data-wow-delay="0s"
    >
      <input
        className="tf-input style-1"
        id={id}
        type={type}
        placeholder=""
        name={name}
        tabIndex={0}
        defaultValue=""
        aria-required="true"
      />
      <label className="tf-field-label fs-15" htmlFor={id}>
        {label}
      </label>
    </fieldset>
  </div>
)

export default FormField
