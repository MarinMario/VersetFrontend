import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout"
import { logout } from "../../Utils/Authorization";
import "./MyProfilePage.css"
import { MdCalendarMonth, MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import useGoogleAuth from "../../Hooks/useGoogleAuth";
import { DtoUser } from "../../Utils/Dtos";
import { RequestGetUserData } from "../../Utils/Requests";
import LoadingPage from "../../Components/LoadingPage";
import ErrorPage from "../../Components/ErrorPage";
import MyProfileSettingsModal from "./MyProfileSettingsModal";
import { formatIsoDate } from "../../Utils/DateTime";
import IconButton from "../../Components/IconButton";
import { MdSettings } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import FollowModal from "./FollowModal";
import FollowingModal from "./FollowingModal";

function MyProfilePage() {

  const [userData, setUserData] = useState<DtoUser | null>(null)
  const [status, setStatus] = useState<"Loading" | "Success" | "Fail">("Loading")
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [followModalOpen, setFollowModalOpen] = useState(false)
  const [followingModalOpen, setFollowingModalOpen] = useState(false)

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
        })
      } else {
        setStatus("Fail")
      }
    })
  }

  const onShare = () => {
    if (userData == null)
      return

    navigator.clipboard.writeText(`${location.origin}/profile/${userData.id}`)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || userData == null)
    return <ErrorPage error="Failed to load page." />

  return (
    <Layout>
      <MyProfileSettingsModal open={settingsModalOpen} setOpen={setSettingsModalOpen} userData={userData} setUserData={setUserData} />
      <FollowModal open={followModalOpen} setOpen={setFollowModalOpen} userData={userData} />
      <FollowingModal open={followingModalOpen} setOpen={setFollowingModalOpen} />
      <div className="my-profile-page">
        <div className="my-profile-details">
          <div className="username-buttons">
            <h3>{userData.name}</h3>
            <div className="share-settings-buttons">
              <div>
                <IconButton onClick={onShare} icon={FaShare} iconClassName="icon" />
              </div>
              <div>
                <IconButton onClick={() => setSettingsModalOpen(true)} icon={MdSettings} iconClassName="small-icon" />
              </div>
            </div>
          </div>
          <div className="icon-content">
            <MdEmail className="icon" />
            <div>{userData.email}</div>
          </div>
          <div className="icon-content">
            <MdCalendarMonth className="icon" />
            <div>Creat pe {formatIsoDate(userData.creationDate + "Z")}</div>
          </div>
          <div className="following-followers-buttons">
            <Button onClick={() => setFollowingModalOpen(true)}>Follwing</Button>
            <Button onClick={() => setFollowModalOpen(true)}>Followers</Button>
          </div>
        </div>
        <div className="my-profile-buttons">
          <Button onClick={onLogOut}>Deconecteaza-te</Button>
        </div>
      </div>
    </Layout>
  )
}

export default MyProfilePage