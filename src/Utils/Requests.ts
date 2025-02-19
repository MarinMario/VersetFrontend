import { Authorization } from "./Authorization"
import { DtoCommentAdd, DtoSongAdd, DtoSongUpdate, DtoUserUpdate } from "./Dtos"

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
  console.log("Request: Songs/GetAll")
  runRequest(runWithAuth, runWithResponse, "GET", "Songs/GetAll")
}

export function RequestAddUser(auth: Authorization, runWithResponse: RunWithResponse) {
  console.log("Request: Users/Add")
  runRequest2(auth, runWithResponse, "POST", "Users/Add")
}

export function RequestGetUserSongs(auth: Authorization, runWithResponse: RunWithResponse) {
  console.log("Request: Songs/GetByUser")
  runRequest2(auth, runWithResponse, "GET", `Songs/GetByUser`)
}

export function RequestGetSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string) {
  console.log(`Request: Songs/GetById/${id}`)
  runRequest(runWithAuth, runWithResponse, "GET", `Songs/GetById/${id}`)
}

export function RequestGetSongPublic(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string) {
  console.log(`Request: Songs/GetByIdPublic/${id}`)
  runRequest(runWithAuth, runWithResponse, "GET", `Songs/GetByIdPublic/${id}`)
}

export function RequestAddSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, song: DtoSongAdd) {
  console.log(`Request: Songs/Add`)
  runRequest(runWithAuth, runWithResponse, "POST", "Songs/Add", {
    name: song.name,
    lyrics: "",
    accessFor: song.accessFor,
    description: ""
  })
}

export function RequestDeleteSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, id: string) {
  console.log(`Request: Songs/Delete/${id}`)
  runRequest(runWithAuth, runWithResponse, "DELETE", `Songs/Delete/${id}`)
}

export function RequestUpdateSong(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, song: DtoSongUpdate) {
  console.log(`Request: Songs/Update`)
  runRequest(runWithAuth, runWithResponse, "POST", `Songs/Update`, song)
}

export function RequestGetPublicSongs(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse) {
  console.log(`Request: Songs/GetPublic`)
  runRequest(runWithAuth, runWithResponse, "GET", "Songs/GetPublic")
}

export function RequestGetUserData(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse) {
  console.log(`Request: Users/GetUserData`)
  runRequest(runWithAuth, runWithResponse, "GET", "Users/GetUserData")
}

export function RequestUpdateUser(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, newUser: DtoUserUpdate) {
  console.log(`Request: Users/Update`)
  runRequest(runWithAuth, runWithResponse, "POST", "Users/Update", newUser)
}

export function RequestToggleRating(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, ratingName: "Like" | "Dislike", songId: string) {
  console.log(`Request: Users/ToggleRating/${ratingName}/${songId}`)
  runRequest(runWithAuth, runWithResponse, "POST", `Users/ToggleRating/${ratingName}/${songId}`)
}

export function RequestAddComment(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, comment: DtoCommentAdd) {
  console.log(`Request: Comments/Add`)
  runRequest(runWithAuth, runWithResponse, "POST", "Comments/Add", comment)
}

export function RequestGetCommentsBySongId(runWithAuth: RunWithAuth, runWithResponse: RunWithResponse, songId: string) {
  console.log(`Request: Comments/GetBySongId/${songId}`)
  runRequest(runWithAuth, runWithResponse, "GET", `Comments/GetBySongId/${songId}`)
}