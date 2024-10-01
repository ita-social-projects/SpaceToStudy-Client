import { s2s } from '~/constants'
import { LocalStorage } from '~/types'

const getLocalObject = () => {
  try {
    return JSON.parse(
      localStorage.getItem(s2s) || 'null'
    ) as LocalStorage | null
  } catch (error) {
    localStorage.removeItem(s2s)
    return null
  }
}

export const getFromLocalStorage = <K extends keyof LocalStorage>(
  name: K
): LocalStorage[K] | null => {
  const localObject = getLocalObject()

  if (!localObject) {
    return null
  }

  return localObject[name]
}

export const setToLocalStorage = <K extends keyof LocalStorage>(
  name: K,
  item: LocalStorage[K]
) => {
  const localObject = getLocalObject() || {}

  localObject[name] = item
  localStorage.setItem(s2s, JSON.stringify(localObject))
}

export const removeFromLocalStorage = <K extends keyof LocalStorage>(
  name: K
) => {
  const localObject = getLocalObject()
  if (localObject) {
    delete localObject[name]
    localStorage.setItem(s2s, JSON.stringify(localObject))
  }
}
