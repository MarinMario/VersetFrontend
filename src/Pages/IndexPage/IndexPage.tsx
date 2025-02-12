import { useEffect } from "react"
import { isLoggedIn } from "../../Utils/Authorization"
import { useNavigate } from "react-router-dom"

function IndexPage() {

  const navigate = useNavigate()

  useEffect(() => {
    navigate(isLoggedIn() ? "/home" : "/login")
  }, [])

  return <></>
}

export default IndexPage