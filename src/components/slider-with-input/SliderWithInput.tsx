import { FC, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useDebounce } from '~/hooks/use-debounce'
import { checkNumberIsInRange, createMarks } from '~/utils/range-filter'
import UAH_icon from '~/assets/img/find-offer/currency_uah.svg'

import { styles } from '~/components/slider-with-input/SliderWithInput.styles'

interface SliderWithInputProps {
  defaultValue: number
  title: string
  max: number
  min: number
  onChange: (value: number) => void
}

const SliderWithInput: FC<SliderWithInputProps> = ({
  defaultValue,
  title,
  max,
  min,
  onChange
}) => {
  const [changedPrice, setChangedPrice] = useState<number | null>(defaultValue)

  const marks = createMarks(min, max)

  const debouncedOnChange = useDebounce((range: number) => {
    onChange(range)
  })

  const onChangeSlider = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      setChangedPrice(value)
      debouncedOnChange(value)
    }
  }

  const handleInputChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = target.value ? Number(target.value) : null
    const constrainedNumber = checkNumberIsInRange({ inputValue, min, max })

    setChangedPrice(inputValue)
    debouncedOnChange(constrainedNumber)
  }

  const handleInputBlur = () => {
    const constrainedNumber = checkNumberIsInRange({
      inputValue: Number(changedPrice),
      min,
      max
    })

    setChangedPrice(constrainedNumber)
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{title}</Typography>

      <Box sx={styles.slider}>
        <Slider
          defaultValue={defaultValue}
          marks={marks}
          max={max}
          min={min}
          onChange={onChangeSlider}
          track={false}
          value={Number(changedPrice)}
          valueLabelDisplay='auto'
        />
      </Box>

      <TextField
        InputProps={{
          startAdornment: (
            <Box component='img' src={UAH_icon} sx={styles.currencyIcon} />
          )
        }}
        fullWidth={false}
        inputProps={{
          inputMode: 'numeric'
        }}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={changedPrice ?? ''}
      />
    </Box>
  )
}

export default SliderWithInput
