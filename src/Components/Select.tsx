import { ReactNode } from "react"
import "./Select.css"
import { IconType } from "react-icons"

interface SelectButton {
  children: ReactNode,
  selected: boolean
  onClick: () => void
  vertical: boolean
}

function SelectButton(props: SelectButton) {


  const classNamesHorizontal = props.selected ? "select-button-selected" : "select-button"
  const classNamesVertical = props.selected ? "select-button-selected-vertical" : "select-button-vertical"
  const classNames = props.vertical ? classNamesVertical : classNamesHorizontal


  return (
    <button
      className={classNames}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

interface IconSelectButtonContentProps {
  icon: IconType,
  text: string,
  iconClassName: string,
}

export function IconSelectButtonContent(props: IconSelectButtonContentProps) {

  return (
    <div>
      {<props.icon className={props.iconClassName} />}
      <div>
        {props.text}
      </div>
    </div>
  )
}


interface SelectProps<T extends string> {
  options: T[]
  optionContent?: Record<T, ReactNode>
  selected: T
  onOptionClick: (option: T) => void
  vertical?: boolean
  small?: boolean

}

function Select<T extends string>(props: SelectProps<T>) {

  const optionContent = props.optionContent
  const vertical = props.vertical ?? false

  const getContent = (option: T) => {
    if (optionContent !== undefined)
      return optionContent[option]

    return <>{option}</>
  }

  const small = props.small ? "select-buttons-small" : ""
  const className = (vertical ? "select-buttons-vertical" : "select-buttons") + " " + small

  return (
    <div className={className}>
      {
        props.options.map(option =>
          <SelectButton
            key={option}
            vertical={vertical}
            selected={option === props.selected}
            onClick={() => props.onOptionClick(option)}
          >
            {getContent(option)}
          </SelectButton>
        )
      }
    </div>
  )
}

export default Select