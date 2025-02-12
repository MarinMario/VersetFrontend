
export type Authorization = {
  access_token: string,
  expires_in: number,
  id_token: string,
  refresh_token: string,
  scope: string,
  token_type: string,
  expiration_unix: number,
}

export const LocalStorageAuthKey = "authorization"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

export async function exchangeAuthCodeForTokens(authCode: string) {
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
        access_type: "offline", // Important: Requests the refresh token
      }),
    });

    if (!response.ok) throw new Error("Failed to exchange auth code");

    return await response.json(); // Contains id_token, access_token, refresh_token
  } catch (error) {
    console.error("Error exchanging auth code:", error);
    return null;
  }
}

export function saveAuth(tokens: any) {
  const expiration_unix = Date.now() + (tokens.expires_in - 60) * 1000
  const auth: Authorization = { ...tokens, expiration_unix: expiration_unix }
  localStorage.setItem(LocalStorageAuthKey, JSON.stringify(auth))
}

export async function refreshAuthorization(refreshToken: string, run: (newAuth: Authorization) => void, login: () => void) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get the error details from the response body
      console.error("Google OAuth2 error:", errorData);
      throw new Error(`Failed to refresh token: ${errorData.error_description}`);
    }

    const newTokens = await response.json();
    const tokensWithRefreshToken = { ...newTokens, refresh_token: refreshToken }
    run(tokensWithRefreshToken)
    saveAuth(tokensWithRefreshToken)

  } catch (error) {
    console.log("Failed to refresh token. Redirecting to Log in...")
    login()

    console.error("Error refreshing token:", error);
  }
}

export function isLoggedIn() {
  return localStorage.getItem(LocalStorageAuthKey) !== null
}