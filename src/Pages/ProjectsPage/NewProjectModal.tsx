import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import "./NewProjectModal.css"
import Input from "../../Components/Input";
import Select from "../../Components/Select";

interface NewProjectModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  addProject: (name: string, accessFor: number) => void
}

function NewProjectModal(props: NewProjectModalProps) {

  const [name, setName] = useState("")
  const [accessFor, setAccessFor] = useState<"0" | "1" | "2">("2")
  const onClose = () => {
    props.setOpen(false)
    setName("")
    setAccessFor("2")
  }

  const addProject = () => {
    props.addProject(name, parseInt(accessFor))
    onClose()
  }

  return (
    <Modal open={props.open} onClose={onClose}>
      <div className="new-project-modal-content">
        <div className="new-project-input-container">
          <span>Nume: </span>
          <Input inputProps={{
            placeholder: "proiectul meu...",
            onChange: e => setName(e.target.value),
            value: name,
            className: "new-project-modal-input"
          }}
          />
        </div>
        <div className="new-project-input-container">
          <span>Acces: </span>
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
        <div className="new-project-modal-buttons">
          <Button onClick={addProject}>
            Salveaza Proiect
          </Button>
          <Button onClick={onClose}>
            Anuleaza
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default NewProjectModal