import { styles } from '~/components/icons-with-counter/IconsWithCounter.style'
import { useState, useEffect } from 'react'

import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const IconsWithCounter = () => {
  const [possibleValue, setPossibleValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)

  useEffect(() => {
    setMaxValue(Math.floor(Math.random() * 20))
  }, [])

  const onClickUp = () => {
    possibleValue < maxValue
      ? setPossibleValue((prev) => prev + 1)
      : setPossibleValue(1)
  }

  const onClickDown = () => {
    possibleValue > 1
      ? setPossibleValue((prev) => prev - 1)
      : setPossibleValue(maxValue)
  }

  return (
    <Box sx={styles.iconBox}>
      <IconButton onClick={onClickUp}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography sx={styles.typography}>
        {possibleValue} of {maxValue}
      </Typography>
      <IconButton onClick={onClickDown}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  )
}

export default IconsWithCounter
