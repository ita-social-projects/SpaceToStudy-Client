import {
  CommonEntityFields,
  ProficiencyLevelEnum,
  StatusEnum
} from '~/types/common/common.index'
import { Offer } from '~/types/offer/offer.index'
import { UserResponse, UserRoleEnum } from '~/types/user/user.index'

export interface Cooperation extends CommonEntityFields {
  offer: Pick<Offer, 'subject' | 'title' | 'category'>
  user: Pick<UserResponse, 'firstName' | 'lastName' | 'photo' | '_id'> & {
    role: UserRoleEnum
  }
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum
  status: StatusEnum
}
