import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDebounce } from '~/hooks/use-debounce'

import { styles } from '~/components/app-range/AppRange.styles'
import { InputRangeArray, RangeArray } from '~/types'
import {
  checkIfRangeValid,
  checkNumberIsInRange,
  checkRangeEquality,
  checkRangeInput,
  createMarks,
  createNewState,
  rangeSort
} from '~/utils/range-filter'

const AppRange = ({ min, max, value, onChange }) => {
  const defaultValue = useMemo(() => value || [min, max], [min, max, value])
  const [range, setRange] = useState < InputRangeArray > defaultValue
  const commitedValue = useRef < RangeArray > defaultValue
  const { t } = useTranslation()

  useEffect(() => {
    if (checkRangeEquality(commitedValue.current, defaultValue)) {
      setRange(defaultValue)
    }
  }, [defaultValue])

  const marks = createMarks(min, max)

  const debouncedOnChange = useDebounce((range) => {
    const sortedRange = rangeSort(range)
    commitedValue.current = sortedRange
    onChange(sortedRange)
  })

  const handleSliderChange = (_, value) => {
    const range = value

    setRange(range)
    debouncedOnChange(range)
  }

  const handleInputChange = ({ target }) => {
    const inputIndex = Number(target.id)
    const inputValue = target.value ? Number(target.value) : null

    if (checkRangeInput(inputValue)) {
      const newRange = createNewState({ range, inputValue, inputIndex })
      setRange(newRange)
      debouncedOnChange(newRange)
    }
  }

  const handleInputBlur = (event) => {
    const inputIndex = Number(event.target.id)
    const inputValue = range[inputIndex]
    const constrainedNumber = checkNumberIsInRange({ inputValue, min, max })

    if (checkIfRangeValid({ inputValue, range, constrainedNumber })) {
      const newRange = createNewState({
        range,
        inputValue: constrainedNumber,
        inputIndex,
        sort: true
      })
      setRange(newRange)
    }
  }

  const sliderValueTooltip = ({ value, children }) => (
    <Tooltip arrow placement='bottom' title={value}>
      {children}
    </Tooltip>
  )

  const rangeInputs = range.map((value, idx) => {
    const title = (idx ? t('common.to') : t('common.from')).toLowerCase()
    const inActivelStyle =
      (idx ? value === max : value === min) && styles.inactiveStyle

    return (
      <Box key={title} sx={styles.inputBlock}>
        <Typography sx={styles.inputTitle} variant={'body2'}>
          {title}
        </Typography>
        <TextField
          id={idx.toString()}
          inputProps={{
            inputMode: 'numeric'
          }}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          sx={[styles.inputContainer, inActivelStyle]}
          type='text'
          value={value ?? ''}
        />
      </Box>
    )
  })

  return (
    <Stack spacing={2} sx={styles.root}>
      <Slider
        marks={marks}
        max={max}
        min={min}
        onChange={handleSliderChange}
        size='small'
        slots={{
          valueLabel: sliderValueTooltip
        }}
        sx={styles.slider}
        value={range.map(Number)}
        valueLabelDisplay='auto'
      />
      <Box style={styles.priceInputs}>{rangeInputs}</Box>
    </Stack>
  )
}

export default AppRange
