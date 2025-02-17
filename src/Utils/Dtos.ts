
export interface DtoUser {
  email: string,
  name: string,
  public: boolean,
  creationDate: string
}

export interface DtoSong {
  id: string,
  name: string,
  lyrics: string,
  description: string,
  accessFor: number,
  creationDate: string,
  lastUpdateDate: string
  user: DtoUser
}

export interface DtoSongAdd {
  name: string,
  accessFor: number
}

export interface DtoSongUpdate {
  id: string,
  name: string,
  lyrics: string,
  description: string,
  accessFor: number
}