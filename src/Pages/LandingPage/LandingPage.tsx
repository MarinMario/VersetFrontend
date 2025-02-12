import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { RequestGetSongs } from "../../Utils/Requests"

function LandingPage() {

  const { runWithAuth, login } = useGoogleAuth()


  const getSongs = () => {
    RequestGetSongs(runWithAuth, response => {
      if(response.ok) {
        response.json().then(data => console.log(data))
      } else {
        console.log("failed to get songs")
      }
    })
  }

  return (
    <>
      <button onClick={() => login()}>login</button>
      <button onClick={() => {
        runWithAuth(auth => {
          console.log("this is the authorization: ", auth)
        })
      }}>get auth</button>
      <button onClick={getSongs}>get songs</button>
    </>
  )
}

export default LandingPage