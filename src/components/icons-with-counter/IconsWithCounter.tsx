import { useState, FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { styles } from '~/components/icons-with-counter/IconsWithCounter.style'

interface IconsWithCounterProps {
  maxValue: number
  onFilteredIndexChange: (index: number) => void
}

const IconsWithCounter: FC<IconsWithCounterProps> = ({
  maxValue,
  onFilteredIndexChange
}) => {
  const [possibleValue, setPossibleValue] = useState<number>(0)

  const { t } = useTranslation()

  useEffect(() => {
    if (!maxValue) {
      setPossibleValue(0)
    }

    onFilteredIndexChange(possibleValue)
  }, [onFilteredIndexChange, maxValue, possibleValue])

  const handleIncrement = () => {
    if (maxValue !== 0) {
      setPossibleValue((prev) => {
        const newValue = (prev + 1) % maxValue
        return newValue
      })
    }
  }

  const handleDecrement = () => {
    if (maxValue !== 0) {
      setPossibleValue((prev) => {
        const newValue = prev > 0 ? prev - 1 : maxValue - 1
        return newValue
      })
    }
  }

  return (
    <Box sx={styles.iconBox}>
      <IconButton data-testid='IconUp' onClick={handleIncrement}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography sx={styles.typography}>
        {maxValue
          ? `${possibleValue + 1} ${t('common.of')} ${maxValue}`
          : `${possibleValue}  ${t('common.of')} ${maxValue}`}
      </Typography>
      <IconButton data-testid='IconDown' onClick={handleDecrement}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  )
}

export default IconsWithCounter
