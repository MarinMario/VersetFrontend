import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DtoFollowPublic, DtoUser } from "../../Utils/Dtos"
import { RequestAcceptFollowRequest, RequestDeleteFollower, RequestGetFollowers } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import Modal from "../../Components/Modal"
import Button from "../../Components/Button"

interface FollowModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  userData: DtoUser
}


function FollowModal(props: FollowModalProps) {

  const [followers, setFollowers] = useState<DtoFollowPublic[]>([])

  const { runWithAuth } = useGoogleAuth()

  const loadFollowers = () => {
    RequestGetFollowers(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setFollowers(data))
      }
    })
  }

  const removeFollower = (followerId: string) => {
    RequestDeleteFollower(runWithAuth, response => {
      if (response.ok) {
        loadFollowers()
      }
    }, followerId)
  }

  const acceptFollower = (followerId: string) => {
    RequestAcceptFollowRequest(runWithAuth, response => {
      if (response.ok) {
        loadFollowers()
      }
    }, followerId)
  }

  const onClose = () => {
    props.setOpen(false)
  }

  useEffect(() => {
    if (props.open)
      loadFollowers()
  }, [props.open])

  return (
    <Modal open={props.open} onClose={onClose}>
      <div>
        {
          followers.length === 0
            ? <div className="my-profile-page-follow">Nu ai urmaritori...</div>
            :
            followers.map(follower =>
              <div key={follower.id} className="my-profile-page-follow">
                {follower.user.name}
                <div className="my-profile-page-follow-modal-buttons">
                  {
                    follower.followStatus === 1
                      ? <Button onClick={() => acceptFollower(follower.user.id)}>Accept</Button>
                      : <></>
                  }
                  <Button onClick={() => removeFollower(follower.user.id)}>Remove</Button>
                </div>
              </div>
            )
        }
      </div>
    </Modal>
  )
}

export default FollowModal