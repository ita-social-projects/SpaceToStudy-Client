import { useState, useEffect } from 'react'

import { ONE_MINUTE } from '~/constants'
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
        if (previousTime === 1000) {
          onTimeEnd?.()
          return 0
        }

        return previousTime - 1000
      })
    }, 1000)

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
