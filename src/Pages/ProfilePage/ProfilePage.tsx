import { useParams } from "react-router-dom"
import ErrorPage, { PageNotFound } from "../../Components/ErrorPage"
import Layout from "../../Components/Layout"
import { useEffect, useState } from "react"
import { RequestGetSongsByUserId, RequestGetUserData, RequestGetUserPublic } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoSongPublic, DtoUser, DtoUserPublic } from "../../Utils/Dtos"
import LoadingPage from "../../Components/LoadingPage"
import { formatIsoDate } from "../../Utils/DateTime"
import Post from "../../Components/Post"

function ProfilePage() {

  const params = useParams()
  const userId = params["id"]

  const [connectedUserData, setConnectedUserData] = useState<DtoUser | null>(null)
  const [userData, setUserData] = useState<DtoUserPublic | null>(null)
  const [userPosts, setUserPosts] = useState<DtoSongPublic[]>([])
  const [status, setStatus] = useState<"Loading" | "Success" | "Fail">("Loading")

  const { runWithAuth } = useGoogleAuth()

  if (userId === undefined)
    return <ErrorPage error="Pagina nu exista." />

  const loadUserData = () => {
    setStatus("Loading")
    RequestGetUserPublic(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data =>
          setUserData(_ => {
            setStatus("Success")
            return data
          }))
      } else {
        setStatus("Fail")
      }
    }, userId)
  }

  const loadUserPosts = () => {
    RequestGetSongsByUserId(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setUserPosts(data))
      }
    }, userId)
  }

  const loadConnectedUserData = () => {
    RequestGetUserData(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setConnectedUserData(data))
      }
    })
  }

  useEffect(() => {
    loadUserData()
    loadUserPosts()
    loadConnectedUserData()
  }, [])

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || userData === null || connectedUserData == null)
    return <PageNotFound />

  return (
    <Layout>
      <div className="page">
        <div>{userData.name}</div>
        <div>Cont creat pe {formatIsoDate(userData.creationDate + "Z")}</div>
        <div>
          <br />
          <div>Postari</div>
          <div>
            {
              userPosts.map(post => <Post song={post} userData={connectedUserData} />)
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage