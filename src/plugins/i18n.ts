import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'
import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'

let initialLanguage = getFromLocalStorage('language')

if (!initialLanguage) {
  const browserLanguage = navigator.language.split('-')[0]
  initialLanguage = browserLanguage === 'uk' ? 'uk' : 'en'
  setToLocalStorage('language', initialLanguage)
}

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  ns: ['translations']
})

i18n.languages = ['en', 'uk']

export default i18n
