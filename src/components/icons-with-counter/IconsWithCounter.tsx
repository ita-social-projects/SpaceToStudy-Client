import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/icons-with-counter/IconsWithCounter.style'
const IconsWithCounter = () => {
  const [possibleValue, setPossibleValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(12)
  const { t } = useTranslation()

  const handleIncrement = () => {
    setPossibleValue((prev) => (prev % maxValue) + 1)
  }

  const handleDecrement = () => {
    possibleValue > 1
      ? setPossibleValue((prev) => prev - 1)
      : setPossibleValue(maxValue)
  }

  return (
    <Box sx={styles.iconBox}>
      <IconButton onClick={handleIncrement}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography sx={styles.typography}>
        {possibleValue} {t('common.of')} {maxValue}
      </Typography>
      <IconButton onClick={handleDecrement}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  )
}

export default IconsWithCounter
