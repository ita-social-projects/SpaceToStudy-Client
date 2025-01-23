import { Cooperation } from '~/types'

export type UpdateCooperationsParams = Partial<
  Pick<Cooperation, 'status' | 'price'>
> &
  Pick<Cooperation, '_id'>

export type UpdateCooperationsSections = Partial<
  Pick<Cooperation, 'sections'>
> &
  Pick<Cooperation, '_id'>

export type UpdateCooperationStatusParams = Partial<
  Pick<Cooperation, 'status' | '_id'>
>
