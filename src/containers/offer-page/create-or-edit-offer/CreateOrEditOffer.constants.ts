import { emptyField, numberField, textField } from '~/utils/validations/common'
import { Offer, StatusEnum } from '~/types'

export const getInitialValues = (offer: Offer | null) => ({
  category: offer?.category._id ?? '',
  subject: offer?.subject._id ?? '',
  proficiencyLevel: offer?.proficiencyLevel ?? [],
  languages: offer?.languages ?? [],
  title: offer?.title ?? '',
  description: offer?.description ?? '',
  price: offer?.price.toString() ?? '',
  status: offer?.status ?? StatusEnum.Active,
  FAQ: offer?.FAQ ?? [{ question: '', answer: '', id: `${Date.now()}` }]
})

export const validations = {
  languages: (value: string[] | string) =>
    emptyField({
      value: value?.toString(),
      emptyMessage: 'offerPage.errorMessages.languages'
    }),
  category: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.category' }),
  subject: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.subject' }),
  price: (value: string) => numberField(value, 'offerPage.errorMessages.price'),
  description: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.description',
      helperText: textField(20, 1000)(value)
    }),
  title: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.title',
      helperText: textField(0, 100)(value)
    }),
  proficiencyLevel: (value: string[] | string) =>
    emptyField({
      value: value?.toString(),
      emptyMessage: 'common.errorMessages.proficiencyLevel'
    })
}
