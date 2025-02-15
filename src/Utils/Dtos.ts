
export interface DtoUser {
  email: string,
  name: string,
  public: boolean,
  creationDate: string
}

export interface DtoSong {
  id: string,
  lyrics: string,
  name: string,
  accessFor: number,
  creationDate: string,
  lastUpdateDate: string
  user: DtoUser
}