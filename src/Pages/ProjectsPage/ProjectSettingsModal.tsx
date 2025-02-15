import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { DtoSong } from "../../Utils/Dtos";
import Button from "../../Components/Button";
import "./ProjectSettingsModal.css"
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import { RequestUpdateSong } from "../../Utils/Requests";
import useGoogleAuth from "../../Hooks/useGoogleAuth";

interface ProjectSettingsModalProps {
  dto: DtoSong
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loadProjects: () => void
}

function ProjectSettingsModal(props: ProjectSettingsModalProps) {

  const [name, setName] = useState(props.dto.name)
  const [accessFor, setAccessFor] = useState<"0" | "1" | "2">("1")

  const { runWithAuth } = useGoogleAuth()

  const onClose = () => {
    props.setOpen(false)
  }

  const onSave = () => {
    RequestUpdateSong(runWithAuth, response => {
      if (response.ok) {
        console.log(`Updated project ${props.dto.name}.`)
        props.loadProjects()
        console.log("name: ", name, "access: ", accessFor)
      } else {
        console.log(`Failed to update project ${props.dto.name}`)
      }

      onClose()
    }, props.dto.id, name, props.dto.lyrics, parseInt(accessFor))
  }

  useEffect(() => {
    setName(props.dto.name)
    setAccessFor(props.dto.accessFor.toString() as "0" | "1" | "2")
  }, [props.open])

  return (
    <Modal open={props.open} onClose={onClose}>
      <div className="project-settings">
        <div className="project-settings-container">
          <div>
            <span className="project-settings-label">Nume:</span>
            <Input inputProps={{
              value: name,
              onChange: event => setName(event.target.value),
              className: "project-settings-name-input"
            }}
            />
          </div>
          <div>
            <span className="project-settings-label">Acces:</span>
            <Select
              small
              options={["0", "1", "2"]}
              selected={accessFor}
              onOptionClick={option => setAccessFor(option)}
              optionContent={{
                "0": <>Public</>,
                "1": <>Urmaritori</>,
                "2": <>Privat</>
              }}
            />
          </div>
          <div>
            <span className="project-settings-label">Data crearii: </span>
            <span>{props.dto.creationDate}</span>
          </div>
          <div>
            <span className="project-settings-label">Ultima modificare: </span>
            <span>{props.dto.lastUpdateDate}</span>
          </div>
        </div>
        <div className="project-settings-modal-buttons">
          <Button onClick={onSave}>Salveaza</Button>
          <Button onClick={onClose}>Anuleaza</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProjectSettingsModal
