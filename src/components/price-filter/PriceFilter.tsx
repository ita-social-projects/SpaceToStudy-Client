import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Slider, { SliderValueLabelProps } from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useDebounce } from '~/hooks/use-debounce'

import { InputPriceArrayType, PriceArrayType } from '~/types/components/price-filter/types/price-filter.types'
import { checkIfPricesValid, checkPriceInput, checkPriceIsInRange, createNewState, pricesSort } from '~/utils/price-filter'
import { styles } from '~/components/price-filter/PriceFilter.styles'

interface PriceFilterProps {
  min: number
  max: number
  onChange: (value: PriceArrayType) => void
}

const PriceFilter: FC<PriceFilterProps> = ({ min, max, onChange }) => {
  const [prices, setPrices] = useState<InputPriceArrayType>([min, max])
  const { t } = useTranslation()

  const marks = [
    { value: min, label: min.toString() },
    { value: max, label: max.toString() }
  ]

  const debouncedOnChange = useDebounce((prices:InputPriceArrayType) => {
    const sortedPrices = pricesSort(prices)
    onChange(sortedPrices)
  } )

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const prices = value as PriceArrayType
    
    setPrices(prices)
    debouncedOnChange(prices)
  }

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const inputIndex  = Number(target.id)
    const inputValue = target.value ? Number(target.value) : null
    const notValidInput = checkPriceInput(inputValue)
    
    if (notValidInput) {
      return
    }

    const newPrices = createNewState({ prices, inputValue, inputIndex })
    setPrices(newPrices)
    debouncedOnChange(newPrices)
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputIndex  = Number(event.target.id)
    const inputValue = prices[inputIndex]
    const constrainedPrice = checkPriceIsInRange({ inputValue, min, max })
    const inputsDontNeedChange = checkIfPricesValid({ inputValue, prices, constrainedPrice })

    if (inputsDontNeedChange) {
      return
    }

    const newPrices = createNewState({ prices, inputValue: constrainedPrice, inputIndex, sort: true })
    setPrices(newPrices)
  }

  const sliderValueTooltip = ({ value, children }: SliderValueLabelProps) => (
    <Tooltip arrow placement="bottom" title={ value }>
      { children }
    </Tooltip>
  )

  const priceInputs = prices.map((value, idx) => {
    const title = (idx ? t('common.to') : t('common.from')).toLowerCase()
    const inActivelStyle = (idx ? value === max : value === min) && styles.inactiveStyle

    return (
      <Box key={ title } sx={ styles.inputBlock }>
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
          sx={ [styles.inputContainer, inActivelStyle ]  }
          type="text"
          value={ value ?? '' }
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
          valueLabel: sliderValueTooltip         
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
