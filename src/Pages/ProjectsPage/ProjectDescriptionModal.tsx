
import { Dispatch, SetStateAction, useState } from "react"
import Button from "../../Components/Button"
import Modal from "../../Components/Modal"
import "./ProjectDescriptionModal.css"
import { RequestUpdateSong } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoSong, DtoSongUpdate } from "../../Utils/Dtos"

interface ProjectDescriptionModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  dto: DtoSong
  loadProjects: () => void
}

function ProjectDescriptionModal(props: ProjectDescriptionModalProps) {

  const [description, setDescription] = useState(props.dto.description)

  const { runWithAuth } = useGoogleAuth()

  const onClose = () => {
    props.setOpen(false)
  }

  const onSave = () => {

    const song: DtoSongUpdate = {
      id: props.dto.id,
      name: props.dto.name,
      lyrics: props.dto.lyrics,
      description: description,
      accessFor: props.dto.accessFor
    }

    RequestUpdateSong(runWithAuth, response => {
      if (response.ok) {
        console.log(`Updated project ${props.dto.name}.`)
        props.loadProjects()
      } else {
        console.log(`Failed to update project ${props.dto.name}`)
      }

      onClose()
    }, song)
  }
  return (
    <Modal open={props.open}>
      <textarea className="project-description-modal-textarea" value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <div className="project-description-modal-buttons">
        <Button onClick={onSave}>Salveaza</Button>
        <Button onClick={onClose}>Anuleaza</Button>
      </div>
    </Modal>
  )
}

export default ProjectDescriptionModal