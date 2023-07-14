import { s2s } from '~/constants'

const getLocalObject = () => JSON.parse(localStorage.getItem('s2s') || 'null')

export const getFromLocalStorage = (name) => {
  const localObject = getLocalObject()

  if (!localObject) {
    return null
  }

  return localObject[name]
}

export const setToLocalStorage = (name, item) => {
  const localObject = getLocalObject() || {}

  localObject[name] = item
  localStorage.setItem(s2s, JSON.stringify(localObject))
}

export const removeFromLocalStorage = (name) => {
  const localObject = getLocalObject()
  if (localObject) {
    delete localObject[name]
    localStorage.setItem(s2s, JSON.stringify(localObject))
  }
}
