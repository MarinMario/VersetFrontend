import { Dispatch, SetStateAction } from "react"
import Modal from "./Modal"
import Button from "./Button"
import "./AreYouSureModal.css"
import useVerticalPage from "../Hooks/useVerticalPage"


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

  const verticalPage = useVerticalPage()

  const contentClasses = "are-you-sure-modal-content " + (verticalPage ? "are-you-sure-modal-content-vertical" : "")

  return (
    <Modal open={props.open} onClose={onClose}>
      <div className={contentClasses}>
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