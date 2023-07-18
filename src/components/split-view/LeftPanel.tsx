import { useEffect, useRef } from 'react'

import Box from '@mui/material/Box'

const LeftPanel: React.FunctionComponent<{
  leftWidth: number | undefined
  setLeftWidth: (value: number) => void
}> = ({ children, leftWidth, setLeftWidth }) => {
  const leftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (leftRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current.clientWidth)
        return
      }

      leftRef.current.style.width = `${leftWidth}px`
    }
  }, [leftRef, leftWidth, setLeftWidth])

  return (
    <Box data-testid='leftPanel' ref={leftRef}>
      {children}
    </Box>
  )
}

export default LeftPanel
