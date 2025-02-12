import { useGoogleLogin } from "@react-oauth/google";

type Authorization = {
  access_token: string,
  expires_in: number,
  id_token: string,
  refresh_token: string,
  scope: string,
  token_type: string,
  expiration_unix: number,
}

const authorization = "authorization"
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

async function exchangeAuthCodeForTokens(authCode: string) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: authCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: "postmessage", // Required for auth-code flow
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) throw new Error("Failed to exchange auth code");

    return await response.json(); // Contains id_token, access_token, refresh_token
  } catch (error) {
    console.error("Error exchanging auth code:", error);
    return null;
  }
}


function useGoogleAuth() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async response => {
      const tokens = await exchangeAuthCodeForTokens(response.code)
      const expiration_unix = Date.now() + (tokens.expires_in - 1) * 60000
      const auth: Authorization = { ...tokens, expiration_unix: expiration_unix }
      localStorage.setItem(authorization, JSON.stringify(auth))
    },
  });

  const getAuthorization = async () => {
    let stringAuth = localStorage.getItem(authorization)

    if (!stringAuth) {
      console.log("No Authorization saved.")
      login()
      stringAuth = localStorage.getItem(authorization)
    }

    if (stringAuth === null) {
      console.log("Failed to request Authorization.")
      return null
    }

    return JSON.parse(stringAuth) as Authorization
  };

  return { getAuthorization, login }
}

export default useGoogleAuth