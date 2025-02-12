import { Authorization } from "../Hooks/useGoogleAuth";

const API_URL = import.meta.env.VITE_API_URL

type Method = "GET" | "POST" | "DELETE"
type RunWithAuth = (run: (auth: Authorization) => void) => void
type RunWithResponse = (response: Response) => void

export function runRequest(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, method: Method, endpoint: string, body?: Object) {
  runWithAuth(auth => {
    return fetch(`${API_URL}/${endpoint}`, {
      method: method,
      headers: {
        "idToken": auth.id_token
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    }).then(response => {
      runWithResponse(response)
    })
  })
}

export function RequestGetSongs(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse) {
  runRequest(runWithAuth, runWithResponse, "GET", "Songs")
}