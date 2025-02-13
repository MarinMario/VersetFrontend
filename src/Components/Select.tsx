import { JSX } from "react"
import "./Select.css"
import { IconType } from "react-icons"

interface SelectButton {
  children: JSX.Element | JSX.Element[] | string,
  selected: boolean,
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
  text: string
}

export function IconSelectButtonContent(props: IconSelectButtonContentProps) {

  return (
    <div className="icon-select-button-content">
      {<props.icon fontSize="25px" />}
      <div className="icon-select-button-content-text" >
        {props.text}
      </div>
    </div>
  )
}


interface SelectProps {
  options: string[]
  optionContent?: Record<string, JSX.Element>
  selected: string
  onClick: (option: string) => void
  vertical?: boolean
}

function Select(props: SelectProps) {

  const optionContent = props.optionContent === undefined ? {} : props.optionContent
  const vertical = props.vertical ?? false

  const getContent = (option: string) => {
    if (optionContent.hasOwnProperty(option))
      return optionContent[option]

    return <>{option}</>
  }

  const className = vertical ? "select-buttons-vertical" : "select-buttons"
  return (
    <div className={className}>
      {
        props.options.map(option =>
          <SelectButton
            vertical={vertical}
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