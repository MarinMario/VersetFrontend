
export interface DtoUser {
  gmail: string,
  name: string
}

export interface DtoSong {
  id: string,
  lyrics: string,
  name: string,
  user: DtoUser
}