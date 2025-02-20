import { ReactNode } from "react";
import "./Button.css"


interface ButtonProps {
  children: ReactNode
  onClick?: (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  variant?: "outlined" | "text"
  small?: boolean
  className?: string
}

function Button(props: ButtonProps) {

  const variant = " button-" + (props.variant ?? "outlined")
  const small = props.small ? " button-small" : ""
  const customClassNames = props.className ?? ""
  const classNames = "button" + variant + small + " " + customClassNames

  return (
    <button className={classNames} onClick={props.onClick} {...props.buttonProps}>
      {props.children}
    </button>
  )
}

export default Button