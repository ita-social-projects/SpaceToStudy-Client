import { FC } from 'react'

import Radio from '@mui/material/Radio'
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { RadioButtonType } from '~/types'
import { styles } from './RadioButtonList.styles'

interface RadioButtonListProps extends Omit<RadioGroupProps, 'onChange'> {
  items: RadioButtonType[]
  onChange: (value: string) => void
}

const RadioButtonList: FC<RadioButtonListProps> = ({ onChange, items, value, title }) => {
  const handleValueUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const radioButtonList = (
    <RadioGroup onChange={ handleValueUpdate }>
      { items.map((radio) => (
        <FormControlLabel
          checked={ value === radio.value }
          control={ <Radio /> }
          key={ radio.value }
          label={ radio.title }
          sx={ styles.radioItems }
          value={ radio.value }
        />
      )) }
    </RadioGroup>
  )

  return (
    <Box>
      { title ? (
        <Typography sx={ styles.title } variant='h6'>
          { title }
        </Typography>
      ) : null }
      { radioButtonList }
    </Box>
  )
}
export default RadioButtonList
