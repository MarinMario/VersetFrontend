import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { FaAt } from "react-icons/fa6";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import { MdPublic } from "react-icons/md";
import { DtoUser, DtoUserUpdate } from "../../Utils/Dtos";
import { RequestUpdateUser } from "../../Utils/Requests";
import useGoogleAuth from "../../Hooks/useGoogleAuth";
import Button from "../../Components/Button";

interface MyProfileSettingsModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  userData: DtoUser
  setUserData: Dispatch<SetStateAction<DtoUser | null>>
}

function MyProfileSettingsModal(props: MyProfileSettingsModalProps) {

  const { runWithAuth } = useGoogleAuth()

  const [name, setName] = useState("")
  const [publicAccess, setPublicAccess] = useState<boolean>(false)

  const saveUserData = () => {
    const userUpdate: DtoUserUpdate = {
      name: name,
      public: publicAccess
    }

    RequestUpdateUser(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => props.setUserData(data))
        props.setOpen(false)
      }
    }, userUpdate)
  }

  const onCancel = () => {
    props.setOpen(false)
    setName(props.userData.name)
    setPublicAccess(props.userData.public)
  }

  useEffect(() => {
    setName(props.userData.name)
    setPublicAccess(props.userData.public)
  }, [props.userData])

  return (
    <Modal open={props.open} onClose={onCancel}>
      <div className="settings-modal-content">
        <div className="icon-content">
          <FaAt className="icon" />
          <Input inputProps={{ value: name, onChange: e => setName(e.target.value), placeholder: "nume..." }} />
        </div>
        <div className="icon-content">
          <MdPublic className="icon" />
          <Select
            small
            options={["true", "false"]}
            selected={publicAccess ? "true" : "false"}
            onOptionClick={option => setPublicAccess(option === "true")}
            optionContent={{
              "true": <>Acces Public</>,
              "false": <>Acces Privat</>,
            }}
          />
        </div>

        <div className="save-cancel-buttons">
          <Button onClick={saveUserData}>Salveaza</Button>
          <Button onClick={onCancel}>Anuleaza</Button>
        </div>
      </div>
    </Modal>
  )
}

export default MyProfileSettingsModal