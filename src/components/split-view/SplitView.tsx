import { useState, useEffect, useRef, useCallback, ReactNode, FC } from 'react'

import Box from '@mui/material/Box'

import { styles } from '~/components/split-view/SplitView.styles'
import LeftPanel from '~/components/split-view/LeftPanel'

interface SplitViewProps {
  isHideLeft?: boolean
  isHideRight?: boolean
  left: ReactNode
  right: ReactNode
  minWidth?: number
}

const SplitView: FC<SplitViewProps> = ({
  isHideLeft = false,
  isHideRight = false,
  left,
  right,
  minWidth = 350
}) => {
  const [leftWidth, setLeftWidth] = useState<number>(minWidth)
  const [separatorXPosition, setSeparatorXPosition] = useState<null | number>(
    null
  )
  const [dragging, setDragging] = useState<boolean>(false)
  const splitPaneRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPosition(e.clientX)
    setDragging(true)
  }

  const onMove = useCallback(
    (clientX: number) => {
      if (dragging && leftWidth && separatorXPosition) {
        const newLeftWidth = leftWidth + clientX - separatorXPosition
        setSeparatorXPosition(clientX)

        if (newLeftWidth < minWidth) {
          setLeftWidth(minWidth)
          return
        }

        if (splitPaneRef.current) {
          const splitPaneWidth = splitPaneRef.current.clientWidth

          if (newLeftWidth > splitPaneWidth - minWidth) {
            setLeftWidth(splitPaneWidth - minWidth)
            return
          }
        }

        setLeftWidth(newLeftWidth)
      }
    },
    [dragging, leftWidth, minWidth, separatorXPosition]
  )

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) e.preventDefault()
      onMove(e.clientX)
    },
    [dragging, onMove]
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      onMove(e.touches[0].clientX)
    },
    [onMove]
  )

  const onMouseUp = useCallback(() => {
    setSeparatorXPosition(null)
    setDragging(false)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    setSeparatorXPosition(e.touches[0].clientX)
    setDragging(true)
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove, onMouseUp, onTouchMove])

  return (
    <Box ref={splitPaneRef} sx={styles.splitView}>
      {!isHideLeft && (
        <LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
          {left}
        </LeftPanel>
      )}
      {!isHideLeft && !isHideRight && (
        <Box
          onMouseDown={onMouseDown}
          onTouchEnd={onMouseUp}
          onTouchStart={onTouchStart}
          sx={styles.dividerHitbox}
        >
          <Box data-testid='divider' sx={styles.divider} />
        </Box>
      )}
      {!isHideRight && <Box sx={styles.rightPane}>{right}</Box>}
    </Box>
  )
}

export default SplitView
