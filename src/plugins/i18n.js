import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    ns: ['translations']
  })

export default i18n
