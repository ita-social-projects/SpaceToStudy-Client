import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.category'),
  subject: (value: string) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.subject'),
  info: (value: string) =>
    emptyField(
      value,
      'offerPage.createOffer.errorMessages.description',
      textField(20, 1000)(value)
    )
}
