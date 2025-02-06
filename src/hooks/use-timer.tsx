import { useState, useEffect } from 'react'

import { formatTime } from '~/utils/helper-functions'

const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((previousTime) => previousTime - 1000)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return formatTime(String(time))
}

export default useTimer
