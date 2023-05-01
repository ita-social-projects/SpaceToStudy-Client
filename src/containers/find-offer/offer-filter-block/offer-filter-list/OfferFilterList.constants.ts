import { LanguagesEnum } from '~/types'

export const defaultResponse = {
  minPrice: 0,
  maxPrice: 1000
}

export const radioButtonsTranslationKeys = [
  { title: 'findOffers.radioFilter.any', value: 0 },
  { title: 'findOffers.radioFilter.5stars', value: 5 },
  { title: 'findOffers.radioFilter.4stars', value: 4 },
  { title: 'findOffers.radioFilter.3stars', value: 3 }
]
export const languageValues = ['', ...Object.values(LanguagesEnum)]
