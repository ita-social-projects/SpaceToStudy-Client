import Radio from '@mui/material/Radio'
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { RadioButtonType } from '~/types'
import { styles } from './RadioButtonInputs.styles'

interface RadioButtonInputsProps<T, U>
  extends Omit<RadioGroupProps, 'onChange'> {
  items: RadioButtonType<T, U>[]
  onChange: (value: string) => void
  value: T
  title?: string
}

const RadioButtonInputs = <T, U>({
  onChange,
  items,
  value,
  title
}: RadioButtonInputsProps<T, U>) => {
  const handleValueUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const radioButtonList = items.map((radio) => (
    <FormControlLabel
      checked={value === radio.value}
      control={<Radio />}
      key={String(radio.value)}
      label={radio.title}
      sx={styles.radioItems}
      value={radio.value}
    />
  ))

  return (
    <Box>
      {title && (
        <Typography sx={styles.title} variant='h6'>
          {title}
        </Typography>
      )}
      <RadioGroup onChange={handleValueUpdate}>{radioButtonList}</RadioGroup>
    </Box>
  )
}
export default RadioButtonInputs
