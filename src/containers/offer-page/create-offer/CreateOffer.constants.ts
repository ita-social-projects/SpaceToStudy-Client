import { StatusEnum } from '~/types'
import { emptyField, numberField, textField } from '~/utils/validations/common'

export const initialValues = {
  category: '',
  subject: '',
  proficiencyLevel: [],
  languages: [],
  title: '',
  description: '',
  price: '',
  status: StatusEnum.Active,
  FAQ: [{ question: '', answer: '' }]
}

export const validations = {
  languages: (value: string[] | string) =>
    emptyField(
      value && value.toString(),
      'offerPage.createOffer.errorMessages.languages'
    ),
  category: (value: string | null) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.subject'),
  price: (value: string) =>
    numberField(value, 'offerPage.createOffer.errorMessages.price'),
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.createOffer.errorMessages.description',
      textField(20, 1000)(value)
    ),
  title: (value: string) =>
    emptyField(
      value,
      'offerPage.createOffer.errorMessages.title',
      textField(0, 100)(value)
    ),
  proficiencyLevel: (value: string[] | string) =>
    emptyField(
      value && value.toString(),
      'offerPage.createOffer.errorMessages.proficiencyLevel'
    )
}
