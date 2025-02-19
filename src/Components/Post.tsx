import { MdThumbDown, MdThumbUp } from "react-icons/md"
import { isoToText } from "../Utils/DateTime"
import { DtoSongPublic, DtoUser } from "../Utils/Dtos"
import Button from "./Button"
import { FaComment, FaShare } from "react-icons/fa6"
import { RequestToggleRating } from "../Utils/Requests"
import useGoogleAuth from "../Hooks/useGoogleAuth"
import "./Post.css"
import { useNavigate } from "react-router-dom"


interface PostProps {
  song: DtoSongPublic
  userData: DtoUser
  onRatingClick?: (rating: "Like" | "Dislike") => void
  expand?: boolean
}

function Post(props: PostProps) {

  const song = props.song

  const userData = props.userData

  const { runWithAuth } = useGoogleAuth()
  const navigate = useNavigate()

  const likeClassName = (songId: string) => userData.likedSongs.includes(songId) ? "post-rating-active" : ""
  const dislikeClassName = (songId: string) => userData.dislikedSongs.includes(songId) ? "post-rating-active" : ""

  const onRatingClick = (ratingName: "Like" | "Dislike", songId: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    RequestToggleRating(runWithAuth, response => {
      if (response.ok) {
        if (props.onRatingClick !== undefined)
          props.onRatingClick(ratingName)
      }
    }, ratingName, songId)
  }

  const onUserNameClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    navigate(`/profile/${song.user.id}`)
  }

  const content =
    <div className="post-description">
      {song.description}
    </div>

  const expandedContent =
    <div className="post-expanded">
      <div className="post-description-expanded">
        {
          props.song.description.split("\n").map((verse, index) => <div className="project-verse" key={index}>{verse}</div>)
        }
      </div>
      <div className="post-lyrics">
        {
          props.song.lyrics.split("\n").map((verse, index) => <div className="project-verse" key={index}>{verse}</div>)
        }
      </div>
    </div>

  const headerClassNames = "post-header" + (props.expand ? " post-header-expanded" : "")

  return (
    <div>
      <div className={headerClassNames}>
        <div className="post-username-and-date">
          <button onClick={onUserNameClick}>{song.user.name}</button>
          <div>⦁</div>
          <div>{isoToText(song.lastUpdateDate + "Z")}</div>
        </div>
        <h3 className="post-name">{song.name}</h3>
      </div>
      {
        props.expand ? expandedContent : content
      }
      <div className="post-footer">
        <div className="post-rate-icons">
          <Button variant="text" onClick={event => onRatingClick("Like", song.id, event)}>
            <MdThumbUp className={likeClassName(song.id)} />
            {song.likes}
          </Button>
          <Button variant="text" onClick={event => onRatingClick("Dislike", song.id, event)}>
            <MdThumbDown className={dislikeClassName(song.id)} />
            {song.dislikes}
          </Button>
        </div>
        <Button variant="text"><FaComment />{song.comments}</Button>
        <Button variant="text"><FaShare />Share</Button>
      </div>
    </div>
  )
}

export default Post