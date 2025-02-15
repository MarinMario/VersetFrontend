import { ReactNode } from "react"
import "./Modal.css"

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose?: () => void
}

function Modal(props: ModalProps) {

  if (!props.open)
    return <></>

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={event => event.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal