import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import { RequestAcceptFollowRequest, RequestDeleteFollower, RequestGetFollowers } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoFollowPublic } from "../../Utils/Dtos"
import Button from "../../Components/Button"

function NotificationsPage() {

  const { runWithAuth } = useGoogleAuth()
  const [follows, setFollows] = useState<DtoFollowPublic[]>([])

  console.log(follows)

  const loadFollowers = () => {
    RequestGetFollowers(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setFollows(data))
      }
    })
  }

  const acceptFollowRequest = (userId: string) => {
    RequestAcceptFollowRequest(runWithAuth, response => {
      if(response.ok)
        loadFollowers()
    }, userId)
  }

  const deleteFollower = (userId: string) => {
    RequestDeleteFollower(runWithAuth, response => {
      if(response.ok)
        loadFollowers()
    }, userId)
  }

  useEffect(() => {
    loadFollowers()
  }, [])

  return (
    <Layout>
      <div className="page">
        {
          follows.map(follow =>
            follow.followStatus == 2
              ? 
              <div key={follow.id}>
                <div>{follow.user.name} te urmareste.</div>
              </div>
              :
              <div key={follow.id} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <div>{follow.user.name} vrea sa te urmareasca.</div>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Button onClick={() => acceptFollowRequest(follow.user.id)}>Accepta</Button>
                  <Button onClick={() => deleteFollower(follow.user.id)}>Respinge</Button>
                </div>
              </div>
          )
        }
      </div>
    </Layout>
  )
}

export default NotificationsPage