import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { useParams } from "react-router-dom"
import { DtoCommentAdd, DtoCommentPublic, DtoSongAdd, DtoSongPublic, DtoUser } from "../../Utils/Dtos"
import { RequestAddComment, RequestGetCommentsBySongId, RequestGetSongPublic, RequestGetUserData } from "../../Utils/Requests"
import LoadingPage from "../../Components/LoadingPage"
import ErrorPage, { PageNotFound } from "../../Components/ErrorPage"
import Post from "../../Components/Post"
import "./PostPage.css"
import Button from "../../Components/Button"
import { compareIsoDates, isoToText } from "../../Utils/DateTime"
import { LoadingCircle } from "../../Components/Loading"

function PostPage() {

  const [post, setPost] = useState<DtoSongPublic | null>(null)
  const [status, setStatus] = useState<"Loading" | "Fail" | "Success">("Loading")
  const [userData, setUserData] = useState<DtoUser | null>(null)
  const [comments, setComments] = useState<DtoCommentPublic[]>([])
  const [commentText, setCommentText] = useState("")
  const [loadingAddComment, setLoadingAddComment] = useState(false)

  const sortedComments = comments.sort((c1, c2) => -compareIsoDates(c1.creationDate, c2.creationDate))

  const { runWithAuth } = useGoogleAuth()
  const { id } = useParams()

  const loadPost = () => {
    if (id === undefined) {
      console.log("Id parameter is not defined.")
      return
    }

    setStatus("Loading")
    RequestGetSongPublic(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => setPost(() => {
          setStatus("Success")
          const castedData = data as DtoSongPublic
          loadComments(castedData.id)
          return data
        }))
      } else {
        setStatus("Fail")
      }
    }, id)
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

  const loadComments = (id: string) => {
    RequestGetCommentsBySongId(runWithAuth, response => {
      if (response.ok)
        response.json().then(data => setComments(data))
    }, id)
  }

  const addComment = () => {
    if (post === null) {
      console.log("Failed to add comment.")
      return
    }

    const newComment: DtoCommentAdd = {
      songId: post.id,
      content: commentText
    }
    setLoadingAddComment(true)
    RequestAddComment(runWithAuth, response => {
      if (response.ok) {
        loadComments(post.id)
      }

      setLoadingAddComment(false)
    }, newComment)

    setCommentText("")
  }

  const onRatingClick = () => {
    loadPost()
    loadUserData()
  }

  useEffect(() => {
    loadPost()
    loadUserData()
  }, [])

  if (id === undefined)
    return <PageNotFound />

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || post === null || userData === null)
    return <ErrorPage error="Postarea nu s-a putut incarca." />

  return (
    <Layout>
      <div className="post-page">
        <div className="page">
          <Post expand song={post} userData={userData} onRatingClick={onRatingClick} />
        </div>
        <div>
          <div className="comment-editor">
            <textarea value={commentText} placeholder="Scrie un comentariu..." onChange={e => setCommentText(e.target.value)} />
            <div>
              <Button variant="text" onClick={addComment}>
                {
                  loadingAddComment ? <LoadingCircle small /> : "Comenteaza"
                }
              </Button>
            </div>
          </div>
          <div className="comments-container">
            {
              sortedComments.map(c =>
                <div key={c.id} className="comment-container">
                  <div className="comment-username-and-date">
                    <div className="comment-username">{c.user.name}</div>
                    <div>⦁</div>
                    <div>{isoToText(c.creationDate + "Z")}</div>
                  </div>
                  <div className="comment-content">{c.content}</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage