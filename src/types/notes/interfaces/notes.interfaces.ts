import { CommonEntityFields, Cooperation, UserResponse } from '~/types'

export interface CreateOrUpdateNoteParams {
  isPrivate: boolean
  text: string
}

export interface NoteResponse extends CommonEntityFields {
  author: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  text: string
  isPrivate: boolean
  cooperation: Pick<Cooperation, '_id'>
}
