import { ReactNode } from "react";
import "./Button.css"


interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  dark?: boolean
}

function Button(props: ButtonProps) {

  const dark = props.dark ?? false
  const classNames = "button" + (dark ? " button-dark" : "")

  return (
    <button className={classNames} onClick={props.onClick} {...props.buttonProps}>
      {props.children}
    </button>
  )
}

export default Button