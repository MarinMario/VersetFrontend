import { FcGoogle } from "react-icons/fc";
import "./SignInButton.css"
import { useGoogleLogin } from "@react-oauth/google";
import { createAuth, exchangeAuthCodeForTokens, getIdTokenData, saveAuth } from "../Utils/Authorization";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { RequestAddUser } from "../Utils/Requests";


function SignInButton() {

  const navigate = useNavigate()

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async response => {
      const tokens = await exchangeAuthCodeForTokens(response.code)
      saveAuth(tokens)
      const auth = createAuth(tokens)
      const idTokenData = getIdTokenData(auth)
      if (idTokenData !== null) {
        RequestAddUser(auth, response => {
          if (response.ok) {
            console.log(`Created User for ${idTokenData.email}.`)
          } else {
            response.json().then(err => console.log(err))
          }

          navigate("/feed")
        })
      }
    },
  });


  return (
    <Button onClick={login}>
      <FcGoogle className="icon" />
      <span>Conecteaza-te cu Google</span>
    </Button>
  )
}

export default SignInButton