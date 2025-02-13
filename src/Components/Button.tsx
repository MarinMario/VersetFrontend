import { JSX } from "react";
import "./Button.css"


interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  onClick?: () => void
}

function Button(props: ButtonProps) {

  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button