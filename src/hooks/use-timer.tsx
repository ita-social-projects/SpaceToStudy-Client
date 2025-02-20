import { useState, useEffect } from 'react'

import { formatDuration } from '~/utils/helper-functions'

const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(() => (initialTime <= 0 ? 0 : initialTime))

  useEffect(() => {
    if (time <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setTime((prevTime) => Math.max(0, prevTime - 1000))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [time])

  return formatDuration(time)
}

export default useTimer
