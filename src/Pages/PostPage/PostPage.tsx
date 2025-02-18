import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { useParams } from "react-router-dom"
import { DtoSongPublic } from "../../Utils/Dtos"
import { RequestGetSongPublic } from "../../Utils/Requests"
import LoadingPage from "../../Components/LoadingPage"
import ErrorPage, { PageNotFound } from "../../Components/ErrorPage"

function PostPage() {

  const [post, setPost] = useState<DtoSongPublic | null>(null)
  const [status, setStatus] = useState<"Loading" | "Fail" | "Success">("Loading")

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
          return data
        }))
      } else {
        setStatus("Fail")
      }
    }, id)
  }

  useEffect(() => {
    loadPost()
  }, [])

  if (id === undefined)
    return <PageNotFound />

  if (status === "Loading")
    return <LoadingPage />

  if (status === "Fail" || post === null)
    return <ErrorPage error="Postarea nu s-a putut incarca." />

  return (
    <Layout>
      <div>{post.name}</div>
      <div>{post.description}</div>
      <div>{post.lyrics}</div>
    </Layout>
  )
}

export default PostPage