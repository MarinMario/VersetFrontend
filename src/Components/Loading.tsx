import { SelectedColor } from "../Utils/Constants"
import "./Loading.css"

interface LoadingProps {
  text?: string
}

function Loading(props: LoadingProps) {

  const text = props.text ?? "Loading..."

  return (
    <div className="loading-container">
      <svg className="loading-circle" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="25" fill="none" stroke={SelectedColor} strokeWidth="8"
          strokeDasharray="110 90" strokeLinecap="round" />
      </svg>
      <div className="loading-text">{text}</div>
    </div>
  )
}

export default Loading