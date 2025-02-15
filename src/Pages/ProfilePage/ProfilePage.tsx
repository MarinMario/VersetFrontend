import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout"
import useWindowSize from "../../Hooks/useWindowSize"
import { getIdTokenData, IdTokenData, logout } from "../../Utils/Authorization";
import "./ProfilePage.css"
import { FaAt } from "react-icons/fa";
import { useEffect, useState } from "react";
import useGoogleAuth from "../../Hooks/useGoogleAuth";

function ProfilePage() {

  const windowSize = useWindowSize()
  const navigate = useNavigate()

  const { runWithAuth } = useGoogleAuth()

  const [tokenData, setTokenData] = useState<IdTokenData | null>(null)

  useEffect(() => {
    runWithAuth(auth => setTokenData(getIdTokenData(auth)))
  }, [])

  const email = tokenData === null ? "Failed to decode user information." : tokenData.email

  const onLogOut = () => {
    logout()
    navigate("/login")
  }

  return (
    <Layout>
        <div className="page profile-page" style={{ height: windowSize.height - 200 }}>
          <div>
            <div className="email">
              <FaAt className="icon" />
              <p>{email}</p>
            </div>
          </div>
          <Button onClick={onLogOut}>Deconecteaza-te</Button>
        </div>
    </Layout>
  )
}

export default ProfilePage