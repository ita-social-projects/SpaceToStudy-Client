import {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  MouseEvent
} from 'react'

import Box from '@mui/material/Box'

import { styles } from '~/components/custom-scroll-bar/CustomScrollBar.styles'

interface CustomScrollBarProps {
  height?: string
  minHeight?: number
  children: ReactNode
}

const CustomScrollBar: FC<CustomScrollBarProps> = ({
  height = '100%',
  minHeight = 200,
  children,
  ...restProps
}) => {
  const [isScroll, setIsScroll] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0)
  const [scrollBoxHeight, setScrollBoxHeight] = useState(minHeight)
  const [scrollBoxTop, setScrollBoxTop] = useState(0)

  const scrollHostRef = useRef<HTMLDivElement>(null)
  const scrollThumbRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!scrollHostRef.current) {
      return
    }
    const scrollHostElement = scrollHostRef.current
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement

    let newTop =
      (Math.round(scrollTop) / Math.round(scrollHeight)) * offsetHeight

    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight)
    setScrollBoxTop(newTop)
  }, [scrollBoxHeight])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setScrollThumbPosition(e.clientY)
    setIsDragging(true)
  }, [])

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        setIsDragging(false)
      }
    },
    [isDragging]
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        e.preventDefault()
        e.stopPropagation()

        if (!scrollHostRef.current) {
          return
        }

        const scrollHostElement = scrollHostRef.current
        const { scrollHeight, offsetHeight } = scrollHostElement

        const deltaY = e.clientY - lastScrollThumbPosition
        const newScrollHostTop = (scrollHeight / offsetHeight) * deltaY

        setScrollThumbPosition(e.clientY)
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        )
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + newScrollHostTop,
          scrollHeight - offsetHeight
        )
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  )

  useEffect(() => {
    if (!scrollHostRef.current || !scrollThumbRef.current) {
      return
    }

    const scrollHostElement = scrollHostRef.current

    const { clientHeight, scrollHeight } = scrollHostElement
    const scrollBoxPercentage = clientHeight / scrollHeight
    const scrollbarHeight = Math.max(
      scrollBoxPercentage * clientHeight,
      minHeight
    )

    if (scrollbarHeight !== scrollHeight) {
      setIsScroll(true)
    } else if (scrollbarHeight === scrollHeight) {
      setIsScroll(false)
    }
    setScrollBoxHeight(scrollbarHeight)
  }, [minHeight])

  useEffect(() => {
    if (!scrollHostRef.current || !scrollThumbRef.current) {
      return
    }

    const scrollHostElement = scrollHostRef.current
    const scrollThumbElement = scrollThumbRef.current

    scrollThumbElement.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
    scrollHostElement.addEventListener('scroll', handleScroll)
    return () => {
      scrollThumbElement.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
      scrollHostElement.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, onMouseDown, onMouseMove, onMouseUp])

  return (
    <Box sx={styles.scrollhostContainer(height, isScroll)}>
      <Box ref={scrollHostRef} sx={styles.scrollhost} {...restProps}>
        {children}
      </Box>
      <Box ref={scrollThumbRef} sx={styles.scrollBar}>
        <Box sx={styles.scrollThumb(scrollBoxHeight, scrollBoxTop)} />
      </Box>
    </Box>
  )
}

export default CustomScrollBar
