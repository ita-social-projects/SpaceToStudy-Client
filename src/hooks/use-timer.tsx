import { useState, useEffect } from 'react'

import { ONE_MINUTE } from '~/constants'
import { formatDuration } from '~/utils/helper-functions'

const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(() => (initialTime <= 0 ? 0 : initialTime))

  const isTimeEnds = time <= ONE_MINUTE

  useEffect(() => {
    if (time <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setTime((previousTime) => Math.max(0, previousTime - 1000))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [time])

  return {
    time: formatDuration(time),
    isTimeEnds
  }
}

export default useTimer
