import { useNavigate, useParams } from "react-router-dom"
import ErrorPage, { PageNotFound } from "../../Components/ErrorPage"
import Layout from "../../Components/Layout"
import { useEffect, useState } from "react"
import { RequestAddFollowRequest, RequestGetFollowStatus, RequestGetSongsByUserId, RequestGetUserData, RequestGetUserPublic, RequestUnfollow } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoFollowStatus, DtoSongPublic, DtoUser, DtoUserPublic } from "../../Utils/Dtos"
import LoadingPage from "../../Components/LoadingPage"
import { formatIsoDate } from "../../Utils/DateTime"
import Post from "../../Components/Post"
import "./ProfilePage.css"
import Button from "../../Components/Button"

function ProfilePage() {

  const params = useParams()
  const userId = params["id"]

  const [connectedUserData, setConnectedUserData] = useState<DtoUser | null>(null)
  const [userData, setUserData] = useState<DtoUserPublic | null>(null)
  const [followStatus, setFollowStatus] = useState<0 | 1 | 2>(0)
  const [userPosts, setUserPosts] = useState<DtoSongPublic[]>([])
  const [status, setStatus] = useState<"Loading" | "Success" | "Fail">("Loading")

  const { runWithAuth } = useGoogleAuth()
  const navigate = useNavigate()

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

  const loadFollowStatus = () => {
    RequestGetFollowStatus(runWithAuth, response => {
      if (response.ok)
        response.json().then(data => {
          const castedData = data as DtoFollowStatus
          setFollowStatus(castedData.followStatus)
        })
    }, userId)
  }

  const addFollowRequest = () => {
    RequestAddFollowRequest(runWithAuth, response => {
      if (response.ok)
        loadFollowStatus()
    }, userId)
  }

  const unfollow = () => {
    RequestUnfollow(runWithAuth, response => {
      if (response.ok)
        loadFollowStatus()
    }, userId)
  }

  const onFollowClick = () => {
    if (followStatus === 0) {
      addFollowRequest()
    } else {
      unfollow()
    }
  }

  const onRatingClick = () => {
    loadUserPosts()
    loadConnectedUserData()
  }

  useEffect(() => {
    loadUserData()
    loadUserPosts()
    loadConnectedUserData()
    loadFollowStatus()
  }, [])

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || userData === null || connectedUserData == null)
    return <PageNotFound />

  return (
    <Layout>
      <div className="page profile-page">
        <div className="profile-page-user-details">
          <h3>{userData.name}</h3>
          <div>Cont creat pe {formatIsoDate(userData.creationDate + "Z")}</div>
        </div>
        <div className="profile-page-buttons">
          <Button onClick={onFollowClick}>
            {
              followStatus === 0
                ? "Follow"
                : followStatus === 1
                  ? "Requested"
                  : "Following"
            }
          </Button>
        </div>
        <div>
          <h3 className="profile-page-posts-title">Postari</h3>
          <div className="profile-page-posts">
            {
              userPosts.map(post =>
                <div key={post.id} className="feed-song" onClick={() => navigate(`/post/${post.id}`)}>
                  <Post song={post} userData={connectedUserData} onRatingClick={onRatingClick} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage