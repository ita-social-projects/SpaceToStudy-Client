import { RequestParams } from '~/types'

export interface MyAttachmentsFilters {
  search: string
}

export interface GetAttachmentsParams
  extends Partial<RequestParams>,
    Partial<MyAttachmentsFilters> {}
