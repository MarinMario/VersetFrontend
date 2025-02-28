import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import { RequestAcceptFollowRequest, RequestDeleteFollower, RequestGetFollowers } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoFollowPublic } from "../../Utils/Dtos"
import Button from "../../Components/Button"
import { compareIsoDates, formatIsoDate } from "../../Utils/DateTime"
import "./NotificationsPage.css"
import { useNavigate } from "react-router-dom"

function NotificationsPage() {

  const { runWithAuth } = useGoogleAuth()
  const [follows, setFollows] = useState<DtoFollowPublic[]>([])

  const navigate = useNavigate()

  const sortedFollows = follows.sort((f1, f2) => -compareIsoDates(f1.date, f2.date))

  const loadFollowers = () => {
    RequestGetFollowers(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setFollows(data))
      }
    })
  }

  const acceptFollowRequest = (userId: string) => {
    RequestAcceptFollowRequest(runWithAuth, response => {
      if (response.ok)
        loadFollowers()
    }, userId)
  }

  const deleteFollower = (userId: string) => {
    RequestDeleteFollower(runWithAuth, response => {
      if (response.ok)
        loadFollowers()
    }, userId)
  }

  const onUsernameClick = (userId: string) => {
    navigate(`/profile/${userId}`)
  }

  useEffect(() => {
    loadFollowers()
  }, [])

  return (
    <Layout>
      <div className="page">
        <div className="notifications">
          {
            sortedFollows.length === 0
              ? "Nu ai notificari..."
              : <></>
          }
          {
            sortedFollows.map(follow =>
              follow.followStatus == 2
                ?
                <div key={follow.id}>
                  <div className="notification-date">{formatIsoDate(follow.date + "Z")}</div>
                  <div className="notification-profile-button">
                    <button onClick={() => onUsernameClick(follow.user.id)}>{follow.user.name}</button> te urmareste.
                  </div>
                </div>
                :
                <div key={follow.id}>
                  <div>
                    <div className="notification-date">{formatIsoDate(follow.date + "Z")}</div>
                  </div>
                  <div className="follow-request-notification-content">
                    <div className="notification-profile-button">
                      <button onClick={() => onUsernameClick(follow.user.id)}>{follow.user.name}</button> vrea sa te urmareasca.
                    </div>
                    <div className="follow-request-notification-buttons">
                      <Button small onClick={() => acceptFollowRequest(follow.user.id)}>Accepta</Button>
                      <Button small onClick={() => deleteFollower(follow.user.id)}>Respinge</Button>
                    </div>
                  </div>
                </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default NotificationsPage