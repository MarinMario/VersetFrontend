import "./Input.css"

type InputProps = {

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  dark?: boolean
}

function Input(props: InputProps) {

  const dark = props.dark ?? false
  const classNames = dark ? "input-dark" : ""

  return (
    <input className={classNames} {...props.inputProps} />
  )
}

export default Input