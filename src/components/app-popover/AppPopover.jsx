import { useState, useRef } from 'react'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'

const AppPopover = ({
  children,
  initialItems,
  initialItemsWrapperStyle,
  showMoreElem,
  hideElem = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const anchorEl = useRef(null)

  const openPopover = () => {
    setIsOpen(true)
  }

  const closePopover = () => {
    setIsOpen(false)
  }

  const hideElement = hideElem && isOpen ? { visibility: 'hidden' } : null

  return (
    <Box ref={anchorEl}>
      <Box sx={{ ...hideElement, ...initialItemsWrapperStyle }}>
        {initialItems}
        <Box onClick={openPopover} sx={{ display: 'inline-block' }}>
          {showMoreElem}
        </Box>
      </Box>

      <Popover
        anchorEl={anchorEl.current}
        data-testid={isOpen && 'app-popover'}
        onClose={closePopover}
        open={isOpen}
        {...props}
      >
        {children}
      </Popover>
    </Box>
  )
}

export default AppPopover
