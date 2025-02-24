
export interface DtoUser {
  id: string,
  email: string,
  name: string,
  public: boolean,
  creationDate: string,
  likedSongs: string[],
  dislikedSongs: string[]
}

export interface DtoUserPublic {
  id: string,
  name: string,
  creationDate: string,
  public: boolean,
}

export interface DtoUserUpdate {
  name: string,
  public: boolean,
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

export interface DtoSongPublic {
  id: string,
  name: string,
  lyrics: string,
  description: string,
  creationDate: string,
  lastUpdateDate: string,
  likes: number,
  dislikes: number,
  comments: number,
  user: DtoUserPublic
}

export interface DtoCommentAdd {
  content: string,
  songId: string
}

export interface DtoCommentPublic {
  id: string,
  content: string,
  creationDate: string,
  edited: boolean,
  user: DtoUserPublic,
  songId: string
}

