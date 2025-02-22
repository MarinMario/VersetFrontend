import { useNavigate } from "react-router-dom"
import SignInButton from "../../Components/SignInButton"
import "./SignInPage.css"
import { LocalStorageAuthKey } from "../../Utils/Authorization"
import { useEffect } from "react"


function SignInPage() {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem(LocalStorageAuthKey) !== null) {
      navigate("/discover")
    }
  }, [])

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-welcome-text">
          <h3>Yo</h3>
          <h3>Toxic ca fluxul unei noxe ma intorc din cosmos pe oxigen vin la mic</h3>
        </div>
        <SignInButton />
      </div>
    </div>
  )
}

export default SignInPage