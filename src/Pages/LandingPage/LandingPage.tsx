import useGoogleAuth from "../../Hooks/useGoogleAuth"

function LandingPage() {

  const { getAuthorization, login } = useGoogleAuth()


  const getSongs = () =>
    getAuthorization().then(auth => {
      if (auth == null) {
        console.log("auth is invalid")
        return;
      }
      fetch("http://localhost:5074/api/Songs", {
        method: "GET",
        headers: {
          "idToken": auth?.id_token
        }
      }).then(response => {
        response.json().then(data => console.log(data))
      })
    })

  return (
    <>
      <button onClick={() => login()}>login</button>
      <button onClick={() => {
        getAuthorization().then(auth => {
          console.log("this is the authorization: ", auth)
        })
      }}>get auth</button>
      <button onClick={getSongs}>get songs</button>
    </>
  )
}

export default LandingPage