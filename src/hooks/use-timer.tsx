import { useState, useEffect } from 'react'

import { ONE_SECOND, ONE_MINUTE } from '~/constants'
import { formatDuration } from '~/utils/helper-functions'

const useTimer = (initialTime: number, onTimeEnd?: () => void) => {
  const [time, setTime] = useState(() => (initialTime <= 0 ? 0 : initialTime))

  const isTimeEnds = time <= ONE_MINUTE

  useEffect(() => {
    if (time <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setTime((previousTime) => {
        if (previousTime === ONE_SECOND) {
          onTimeEnd?.()
          return 0
        }

        return previousTime - ONE_SECOND
      })
    }, ONE_SECOND)

    return () => {
      clearInterval(intervalId)
    }
  }, [time, onTimeEnd])

  return {
    time: formatDuration(time),
    isTimeEnds
  }
}

export default useTimer
