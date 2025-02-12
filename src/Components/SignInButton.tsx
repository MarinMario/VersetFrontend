import { FaGoogle } from "react-icons/fa";
import "./SignInButton.css"
import { useGoogleLogin } from "@react-oauth/google";
import { exchangeAuthCodeForTokens, saveAuth } from "../Utils/Authorization";
import { useNavigate } from "react-router-dom";


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
    <button className="sign-in-button" onClick={login}>
      <FaGoogle size="30px" />
      Conecteaza-te cu Google
    </button>
  )
}

export default SignInButton