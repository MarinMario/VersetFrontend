import { Dispatch, SetStateAction } from "react"
import Modal from "./Modal"
import Button from "./Button"
import "./AreYouSureModal.css"


interface AreYouSureModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  question: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

function AreYouSureModal(props: AreYouSureModalProps) {

  const onClose = () => props.setOpen(false)
  const confirmText = props.confirmText ?? "Da"
  const cancelText = props.cancelText ?? "Nu"

  return (
    <Modal open={props.open} onClose={onClose}>
      <div className="are-you-sure-modal-content">
        <div>{props.question}</div>
        <div className="are-you-sure-modal-buttons">
          <Button onClick={props.onConfirm}>{confirmText}</Button>
          <Button onClick={onClose}>{cancelText}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AreYouSureModal