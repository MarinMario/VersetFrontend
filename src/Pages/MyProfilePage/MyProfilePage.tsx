import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout"
import useWindowSize from "../../Hooks/useWindowSize"
import { logout } from "../../Utils/Authorization";
import "./MyProfilePage.css"
import { FaAt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { useEffect, useState } from "react";
import useGoogleAuth from "../../Hooks/useGoogleAuth";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import { DtoUser, DtoUserUpdate } from "../../Utils/Dtos";
import { RequestGetUserData, RequestUpdateUser } from "../../Utils/Requests";
import LoadingPage from "../../Components/LoadingPage";
import ErrorPage from "../../Components/ErrorPage";
import { LoadingCircle } from "../../Components/Loading";

function MyProfilePage() {

  const [userData, setUserData] = useState<DtoUser | null>(null)
  const [status, setStatus] = useState<"Loading" | "Success" | "Fail">("Loading")
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [publicAccess, setPublicAccess] = useState<boolean>(false)

  const navigate = useNavigate()

  const { runWithAuth } = useGoogleAuth()

  const onLogOut = () => {
    logout()
    navigate("/login")
  }

  const loadUserData = () => {
    setStatus("Loading")
    RequestGetUserData(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => {
          setUserData(_ => {
            setStatus("Success")
            return data
          })
          setName(data.name)
          setPublicAccess(data.public)

        })
      } else {
        setStatus("Fail")
      }
    })
  }

  const saveUserData = () => {
    setSaving(true)

    const userUpdate: DtoUserUpdate = {
      name: name,
      public: publicAccess
    }

    RequestUpdateUser(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setUserData(data))
      }

      console.log(userUpdate)

      setSaving(false)
    }, userUpdate)
  }

  useEffect(() => {
    // runWithAuth(auth => setTokenData(getIdTokenData(auth)))
    loadUserData()
  }, [])

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || userData == null)
    return <ErrorPage error="Failed to load page." />

  return (
    <Layout>
      <div className="page my-profile-page">
        <div className="my-profile-details">
          <div>
            <MdEmail className="icon" />
            <p>{userData.email}</p>
          </div>
          <div>
            <FaAt className="icon" />
            <Input inputProps={{ value: name, onChange: e => setName(e.target.value), placeholder: "nume..." }} />
          </div>
          <div>
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
        </div>
        <div className="my-profile-buttons">
          <Button onClick={saveUserData}>{saving ? <LoadingCircle small /> : "Salveaza"}</Button>
          <Button onClick={onLogOut}>Deconecteaza-te</Button>
        </div>
      </div>
    </Layout>
  )
}

export default MyProfilePage