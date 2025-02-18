import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import "./HomePage.css"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoSongPublic, DtoUser, DtoUserUpdate } from "../../Utils/Dtos"
import { RequestGetPublicSongs, RequestGetUserData, RequestToggleRating, RequestUpdateUser } from "../../Utils/Requests"
import { compareIsoDates, isoToText } from "../../Utils/DateTime"
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import Button from "../../Components/Button"
import { LoadingCircle } from "../../Components/Loading"

function HomePage() {

  const { runWithAuth } = useGoogleAuth()
  const [publicSongs, setPublicSongs] = useState<DtoSongPublic[]>([])
  const [userData, setUserData] = useState<DtoUser | null>(null)

  const sortedSongs = publicSongs.sort((a, b) => -compareIsoDates(a.lastUpdateDate, b.lastUpdateDate))

  const loadPublicSongs = () => {
    RequestGetPublicSongs(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setPublicSongs(data))
      } else {
        console.log("Failed to load songs.")
      }
    })
  }

  const loadUserData = () => {
    RequestGetUserData(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setUserData(data))
      } else {
        console.log("Failed to load User Data.")
      }
    })
  }

  const onRatingClick = (ratingName: "Like" | "Dislike", songId: string) => {
    RequestToggleRating(runWithAuth, response => {
      if (response.ok) {
        loadPublicSongs()
        loadUserData()
      }
    }, ratingName, songId)
  }

  useEffect(() => {
    loadPublicSongs()
    loadUserData()
  }, [])

  const likeClassName = (songId: string) => {
    if (userData === null)
      return ""

    return userData.likedSongs.includes(songId) ? "homepage-rating-active" : ""
  }

  const dislikeClassName = (songId: string) => {
    if (userData === null)
      return ""

    return userData.dislikedSongs.includes(songId) ? "homepage-rating-active" : ""
  }


  // if (userData == null)
  //   return (
  //     <Layout>
  //       <div className="homepage-loading">
  //         <LoadingCircle />
  //       </div>
  //     </Layout>
  //   )

  return (
    <Layout>
      <div className="feed">
        {
          sortedSongs.map(song =>
            <div key={song.id} className="feed-song">
              <div className="feed-song-header">
                <div className="feed-song-username-and-date">
                  <button>{song.user.name}</button>
                  <div>⦁</div>
                  <div>{isoToText(song.lastUpdateDate + "Z")}</div>
                </div>
                <h3 className="feed-song-name">{song.name}</h3>
              </div>
              <div className="feed-song-description">
                {song.description}
              </div>
              <div className="feed-song-footer">
                <div className="feed-rate-icons">
                  <Button variant="text" onClick={() => onRatingClick("Like", song.id)}>
                    <MdThumbUp className={likeClassName(song.id)} />
                    {song.likes}
                  </Button>
                  <Button variant="text" onClick={() => onRatingClick("Dislike", song.id)}>
                    <MdThumbDown className={dislikeClassName(song.id)} />
                    {song.dislikes}
                  </Button>
                </div>
                <Button variant="text"><FaComment />4</Button>
                <Button variant="text"><FaShare />Share</Button>
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default HomePage