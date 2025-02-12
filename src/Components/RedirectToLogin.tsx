
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Utils/Authorization";


function RedirectToLogin() {

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn())
      navigate("/login")
  }, [])

  return <></>
}

export default RedirectToLogin