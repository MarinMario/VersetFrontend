import { IconType } from "react-icons";
import "./IconButton.css"


interface IconButtonProps {
  icon: IconType
  iconClassName: string
  onClick?: () => void
  disabled?: boolean
}

function IconButton(props: IconButtonProps) {

  const disabled = props.disabled ?? false

  const classNames = disabled ? "icon-button-disabled" : "icon-button"

  const onClick = () => {
    if (!disabled && props.onClick !== undefined)
      props.onClick()
  }

  return (
    <button className={classNames} onClick={onClick}>
      {<props.icon className={props.iconClassName} />}
    </button>
  )
}

export default IconButton