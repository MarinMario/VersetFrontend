import { SelectedColor } from "../Utils/Constants"
import "./Loading.css"


export function LoadingCircle(props: { small?: boolean }) {

  const smallCircle = props.small ? "loading-circle-small" : ""
  const circleClasses = "loading-circle " + smallCircle

  return (
    <svg className={circleClasses} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke={SelectedColor} strokeWidth="10"
        strokeDasharray="110 90" strokeLinecap="round" />
    </svg>
  )
}

interface LoadingProps {
  text?: string
  small?: boolean
}

function Loading(props: LoadingProps) {

  const text = props.text ?? "Loading..."
  const small = props.small ? "loading-small" : ""
  const classNames = "loading-container " + small

  return (
    <div className={classNames}>
      <LoadingCircle small={props.small} />
      {
        props.text === undefined
          ? <></>
          : <div className="loading-text">{text}</div>
      }
    </div>
  )
}

export default Loading