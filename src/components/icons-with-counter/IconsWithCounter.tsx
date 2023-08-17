import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useState, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/icons-with-counter/IconsWithCounter.style'

interface IconsWithCounterProps {
  maxValue: number
}

const IconsWithCounter: FC<IconsWithCounterProps> = ({ maxValue }) => {
  const [possibleValue, setPossibleValue] = useState<number>(0)
  const { t } = useTranslation()

  const handleIncrement = () => {
    setPossibleValue((prev) => (prev % maxValue) + 1)
  }

  const handleDecrement = () => {
    setPossibleValue((prev) => (prev - 1 + maxValue) % maxValue)
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
