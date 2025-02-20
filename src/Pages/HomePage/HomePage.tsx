import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import "./HomePage.css"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoSongPublic, DtoUser } from "../../Utils/Dtos"
import { RequestGetPublicSongs, RequestGetUserData } from "../../Utils/Requests"
import { compareIsoDates } from "../../Utils/DateTime"
import { useNavigate } from "react-router-dom"
import Post from "../../Components/Post"
import LoadingPage from "../../Components/LoadingPage"

function HomePage() {

  const { runWithAuth } = useGoogleAuth()
  const [publicSongs, setPublicSongs] = useState<DtoSongPublic[]>([])
  const [userData, setUserData] = useState<DtoUser | null>(null)

  const navigate = useNavigate()

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

  const onRatingClick = () => {
    loadPublicSongs()
    loadUserData()
  }

  useEffect(() => {
    loadUserData()
    loadPublicSongs()
  }, [])

  if (userData === null)
    return <LoadingPage />

  return (
    <Layout>
      <div className="feed">
        {
          sortedSongs.map(song =>
            <div key={song.id} className="feed-song" onClick={() => navigate(`/post/${song.id}`)}>
              <Post song={song} onRatingClick={onRatingClick} userData={userData} />
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default HomePage