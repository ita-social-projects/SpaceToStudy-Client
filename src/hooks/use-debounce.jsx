import { useEffect, useRef } from 'react'

export const useDebounce = (callback, delay = 500) => {
  const timer = useRef()

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const debouncedCallback = (...args) => {
    const newTimer = setTimeout(() => {
      callback(...args)
    }, delay)
    if (timer.current) clearTimeout(timer.current)
    timer.current = newTimer
  }

  return debouncedCallback
}
