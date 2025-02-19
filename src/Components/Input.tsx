import "./Input.css"

type InputProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

function Input(props: InputProps) {

  return (
    <input {...props.inputProps} />
  )
}

export default Input