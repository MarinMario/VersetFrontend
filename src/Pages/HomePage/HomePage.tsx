import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import "./HomePage.css"
import { Authorization } from "../../Utils/Authorization"
import useGoogleAuth from "../../Hooks/useGoogleAuth"

function HomePage() {

  const { runWithAuth } = useGoogleAuth()
  const [auth, setAuth] = useState<Authorization | null>(null)

  useEffect(() => {
    runWithAuth(_auth => {
      setAuth(_auth)
    })
  }, [])

  return (
    <Layout>
      <div style={{ padding: "30px", width: "800px", wordWrap: "break-word" }}>
        {auth?.id_token}
      </div>
    </Layout>
  )
}

export default HomePage