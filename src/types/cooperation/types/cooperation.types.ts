import { Cooperation } from '~/types'

export type UpdateCooperationsParams = Partial<
  Pick<Cooperation, 'status' | 'price' | '_id'>
>
