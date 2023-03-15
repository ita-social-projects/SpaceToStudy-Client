import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Slider, { SliderValueLabelProps } from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useDebounce } from '~/hooks/use-debounce'

import { styles } from '~/components/price-filter/PriceFilter.styles'

export interface PriceFilterProps {
  min: number,
  max: number,
  onChange: (value: [number, number]) => void
};
type PriceArray = [number, number]
type InputPriceArray = [number|string, number|string]

const PriceFilter: FC<PriceFilterProps> = ({ min, max, onChange }) => {
  const [prices, setPrices] = useState<InputPriceArray>([min, max])
  const { t } = useTranslation()

  const marks = [
    { value: min, label: min.toString() },
    { value: max, label: max.toString() }
  ]

  const debouncedHandlePriceChange = useDebounce( onChange )

  const handleSliderChange = (_ : Event, value: number | number[]) => {
    const prices = value as PriceArray
    setPrices(prices)
    debouncedHandlePriceChange(prices)
  }

  const pricesSort = (prices:InputPriceArray) => prices.map(Number).sort((a, b) => a - b) as PriceArray

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    const inputPrice = value === '' ? '' : Number(value)
    const inputRegexp = /^$|^[0-9]+$/

    if (!inputRegexp.test(value)) {
      return
    }

    const newPrices = [...prices] as InputPriceArray
    newPrices[Number(id)] = inputPrice

    const sortedPrices = pricesSort(newPrices)

    setPrices(newPrices)
    debouncedHandlePriceChange(sortedPrices)
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputIndex  = Number(event.target.id)
    const inputValue = Number(event.target.value)
    const constrainedPrice = Math.min(Math.max(inputValue, min), max)

    if (prices[inputIndex] === constrainedPrice && prices[0] <= prices[1]) {
      return
    }

    const newPrices = [...prices] as InputPriceArray
    newPrices[inputIndex] = constrainedPrice

    const sortedPrices = pricesSort(newPrices)

    setPrices(sortedPrices)
  }

  const valueLabel = ({ value, children }: SliderValueLabelProps) => (
    <Tooltip arrow placement="bottom" title={ value }>
      { children }
    </Tooltip>
  )

  const priceInputs = prices.map((value, idx) => {
    const title = (idx ? t('common.to') : t('common.from')).toLowerCase()
    const optionalStyle = (idx ? value === max : value === min) && styles.optionalInput
    return (
      <Box key={ idx } sx={ styles.inputBlock }>
        <Typography sx={ styles.inputTitle } variant={ 'body2' }>
          { title } 
        </Typography>  
        <TextField
          id={ idx.toString() }
          inputProps={ {
            inputMode: 'numeric'
          } }
          onBlur={ handleInputBlur }
          onChange={ handleInputChange }
          sx={ [styles.inputContainer, optionalStyle ]  }
          type="text"
          value={ value }
        />
      </Box>
    )})

  return (
    <Stack spacing={ 2 } sx={ styles.root }>
      <Slider
        marks={ marks }
        max={ max }
        min={ min }
        onChange={ handleSliderChange }
        size='small'
        slots={ {
          valueLabel: valueLabel         
        } }
        sx={ styles.slider }
        value={ prices.map(Number) }
        valueLabelDisplay="auto"
      />       
      <Box style={ styles.priceInputs }> 
        { priceInputs }
      </Box>
    </Stack>
  )
}
export default PriceFilter
