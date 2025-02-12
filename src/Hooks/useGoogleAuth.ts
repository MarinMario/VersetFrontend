import { useGoogleLogin } from "@react-oauth/google";
import { Authorization, exchangeAuthCodeForTokens, LocalStorageAuthKey, refreshAuthorization, saveAuth } from "../Utils/Authorization";

function useGoogleAuth() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async response => {
      const tokens = await exchangeAuthCodeForTokens(response.code)
      saveAuth(tokens)
    },
  });

  const runWithAuth = (run: (auth: Authorization) => void) => {
    let stringAuth = localStorage.getItem(LocalStorageAuthKey)

    if (stringAuth === null) {
      console.log("No Authorization found. Redirecting to log in.")
      login()
      return
    }
    const auth = JSON.parse(stringAuth) as Authorization

    if (Date.now() >= auth.expiration_unix) {
      console.log("Authorization has expired. Refreshing tokens.")
      refreshAuthorization(auth.refresh_token, run, login)
      return
    }

    const expiresIn = Math.floor((auth.expiration_unix - Date.now()) / 1000)
    console.log(`Authorization expires in ${expiresIn} seconds.`)

    run(auth)
  };

  return { runWithAuth, login }
}

export default useGoogleAuth