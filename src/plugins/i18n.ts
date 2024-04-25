import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'
import { getFromLocalStorage } from '~/services/local-storage-service'

const initialLanguage = getFromLocalStorage('language') || 'en'

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  ns: ['translations']
})

i18n.languages = ['en', 'ua']

export default i18n
