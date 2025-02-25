import { useState, useEffect } from 'react'

import { ONE_SECOND, ONE_MINUTE } from '~/constants'
import { formatDuration } from '~/utils/helper-functions'

type UseTimerOptions = {
  initialTime: number
  runningOutTime?: number
  onTimeEnd?: () => void
}

const useTimer = ({
  initialTime,
  runningOutTime = ONE_MINUTE,
  onTimeEnd
}: UseTimerOptions) => {
  const [time, setTime] = useState(() => (initialTime <= 0 ? 0 : initialTime))

  const isTimeRunningOut = time <= runningOutTime

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
    isTimeRunningOut
  }
}

export default useTimer
