import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "../../Components/Modal"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoFollowPublic } from "../../Utils/Dtos"
import Button from "../../Components/Button"
import { RequestAddFollowRequest, RequestGetFollowing, RequestUnfollow } from "../../Utils/Requests"

interface FollowingModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function FollowingModal(props: FollowingModalProps) {

  const [following, setFollowing] = useState<DtoFollowPublic[]>([])

  const { runWithAuth } = useGoogleAuth()

  const onClose = () => {
    props.setOpen(false)
  }

  const loadFollowing = () => {
    RequestGetFollowing(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setFollowing(data))
      }
    })
  }

  const addFollowRequest = (userId: string) => {
    RequestAddFollowRequest(runWithAuth, response => {
      if (response.ok)
        loadFollowing()
    }, userId)
  }

  const unfollow = (userId: string) => {
    RequestUnfollow(runWithAuth, response => {
      if (response.ok)
        loadFollowing()
    }, userId)
  }

  const onFollowClick = (userId: string) => {
    const followList = following.filter(f => f.follows.id === userId)
    if (followList.length === 0)
      return
    const follow = followList[0]

    if (follow.followStatus === 0) {
      addFollowRequest(userId)
    } else {
      unfollow(userId)
    }
  }

  useEffect(() => {
    if (props.open)
      loadFollowing()
  }, [props.open])

  return (
    <Modal open={props.open} onClose={onClose}>
      <div>
        {
          following.length === 0
            ? <div className="my-profile-page-follow">Nu urmaresti pe nimeni...</div>
            :
            following.map(follow =>
              <div key={follow.id} className="my-profile-page-follow">
                {follow.follows.name}
                <div className="my-profile-page-following-button">
                  <Button onClick={() => onFollowClick(follow.follows.id)}>
                    {
                      follow.followStatus === 0
                        ? "Follow"
                        : follow.followStatus === 1
                          ? "Remove Request"
                          : "Unfollow"
                    }
                  </Button>
                </div>
              </div>
            )
        }
      </div>
    </Modal>
  )
}

export default FollowingModal