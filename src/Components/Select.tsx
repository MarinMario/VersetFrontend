import { JSX } from "react"
import "./Select.css"
import { IconType } from "react-icons"

interface SelectButton {
  children: JSX.Element | JSX.Element[] | string,
  selected: boolean,
  onClick: () => void
}

function SelectButton(props: SelectButton) {

  const classNames = props.selected ? "select-button-selected" : "select-button"

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
  text: string
}

export function IconSelectButtonContent(props: IconSelectButtonContentProps) {

  return (
    <div className="icon-select-button-content">
      {<props.icon fontSize="25px" />}
      {props.text}
    </div>
  )
}


interface SelectProps {
  options: string[]
  optionContent?: Record<string, JSX.Element>
  selected: string
  onClick: (option: string) => void
}

function Select(props: SelectProps) {

  const optionContent = props.optionContent === undefined ? {} : props.optionContent

  const getContent = (option: string) => {
    if (optionContent.hasOwnProperty(option))
      return optionContent[option]

    return <>{option}</>
  }

  return (
    <div className="select-buttons">
      {
        props.options.map(option =>
          <SelectButton
            selected={option === props.selected}
            onClick={() => props.onClick(option)}
          >
            {getContent(option)}
          </SelectButton>
        )
      }
    </div>
  )
}

export default Select