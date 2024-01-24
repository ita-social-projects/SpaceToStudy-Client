import { CommonEntityFields, Cooperation, UserResponse } from '~/types'

export interface Note extends CommonEntityFields {
  text: string
  isPrivate: boolean
  author: Pick<UserResponse, '_id'>
  cooperation: Pick<Cooperation, '_id'>
}

export interface CreateNoteParams {
  isPrivate: boolean
  text: string
}

export interface NoteResponse extends Omit<Note, 'author'> {
  author: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
}
