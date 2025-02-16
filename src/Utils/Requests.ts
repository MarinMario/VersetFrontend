import { Authorization } from "./Authorization"

const API_URL = import.meta.env.VITE_API_URL

type Method = "GET" | "POST" | "DELETE"
type RunWithAuth = (run: (auth: Authorization) => void) => void
type RunWithResponse = (response: Response) => void

export function runRequest2(auth: Authorization, runWithResponse: RunWithResponse, method: Method, endpoint: string, body?: Object) {
  return fetch(`${API_URL}/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "idToken": auth.id_token,
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  }).then(response => {
    runWithResponse(response)
  })
}

export function runRequest(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, method: Method, endpoint: string, body?: Object) {
  runWithAuth(auth => {
    runRequest2(auth, runWithResponse, method, endpoint, body)
  })
}

export function RequestGetSongs(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse) {
  runRequest(runWithAuth, runWithResponse, "GET", "Songs")
}

export function RequestAddUser(auth: Authorization, runWithResponse: RunWithResponse) {
  runRequest2(auth, runWithResponse, "POST", "Users")
}

export function RequestGetUserSongs(auth: Authorization, runWithResponse: RunWithResponse) {
  runRequest2(auth, runWithResponse, "GET", `Songs/user`)
}

export function RequestGetSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string) {
  runRequest(runWithAuth, runWithResponse, "GET", `Songs/id/${id}`)
}

export function RequestAddSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, name: string, accessFor: number) {
  runRequest(runWithAuth, runWithResponse, "POST", "Songs", { name: name, lyrics: "", accessFor: accessFor })
}

export function RequestDeleteSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string) {
  runRequest(runWithAuth, runWithResponse, "DELETE", `Songs/id/${id}`)
}

export function RequestUpdateSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string, name: string, lyrics: string, accessFor: number) {
  runRequest(runWithAuth, runWithResponse, "POST", `Songs/update/${id}`, {
    lyrics: lyrics,
    name: name,
    accessFor: accessFor,
  })
}