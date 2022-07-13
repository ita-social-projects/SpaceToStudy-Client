import { s2s } from '~/constants'

export const clearLocalStorage = () => {
  const localObject = {
    accessToken: null
  }
  localStorage.setItem(s2s, JSON.stringify(localObject))
}

if (!localStorage.getItem(s2s)) {
  clearLocalStorage()
}

export const getFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem(s2s))

  return localObject[name]
}

export const setToLocalStorage = (name, item) => {
  const localObject = JSON.parse(localStorage.getItem(s2s))
  localObject[name] = item

  localStorage.setItem(s2s, JSON.stringify(localObject))
}

export const removeFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem(s2s))
  delete localObject[name]

  localStorage.setItem(s2s, JSON.stringify(localObject))
}
