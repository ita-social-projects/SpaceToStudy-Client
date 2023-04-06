import { useRef, useEffect } from 'react'

type TimerType = ReturnType<typeof setTimeout>
type CallbackType<T> = (...args: T[]) => void

export const useDebounce = <T,>(
  callback: CallbackType<T>,
  delay = 500
): CallbackType<T> => {
  const timer = useRef<TimerType>()

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const debouncedCallback = (...args: T[]) => {
    const newTimer = setTimeout(() => {
      callback(...args)
    }, delay)
    if (timer.current) clearTimeout(timer.current)
    timer.current = newTimer
  }

  return debouncedCallback
}
