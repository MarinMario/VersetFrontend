import { FcGoogle } from "react-icons/fc";
import "./SignInButton.css"
import { useGoogleLogin } from "@react-oauth/google";
import { exchangeAuthCodeForTokens, saveAuth } from "../Utils/Authorization";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


function SignInButton() {

  const navigate = useNavigate()

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async response => {
      const tokens = await exchangeAuthCodeForTokens(response.code)
      saveAuth(tokens)
      navigate("/home")
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