import { s2s } from '~/constants'

export const getFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem(s2s))
  if (!localObject) {
    return null
  }
  return localObject[name]
}

export const setToLocalStorage = (name, item) => {
  let localObject = JSON.parse(localStorage.getItem(s2s))
  if (!localObject) {
    localObject = {}
  }
  localObject[name] = item
  localStorage.setItem(s2s, JSON.stringify(localObject))
}

export const removeFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem(s2s))
  if (localObject) {
    delete localObject[name]
    localStorage.setItem(s2s, JSON.stringify(localObject))
  }
}
