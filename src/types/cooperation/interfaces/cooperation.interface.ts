import {
  CommonEntityFields,
  ProficiencyLevelEnum,
  StatusEnum
} from '~/types/common/common.index'
import { Offer } from '~/types/offer/offer.index'
import { UserResponse } from '~/types/user/user.index'

export interface Cooperation extends CommonEntityFields {
  offer: Pick<Offer, 'description' | 'subject' | 'title'>
  user: Pick<UserResponse, 'firstName' | 'lastName' | 'photo'>
  price: Offer['price']
  requiredProficiencyLevel: ProficiencyLevelEnum
  status: StatusEnum
}
