import { IoMdCloseCircle } from "react-icons/io";
import "./Error.css"


interface ErrorProps {
  text: string
}

function Error(props: ErrorProps) {

  return (
    <div className="icon-text-div error-container">
      <IoMdCloseCircle className="error-icon" />
      <div className="text">
        {props.text}
      </div>
    </div>
  )
}

export default Error