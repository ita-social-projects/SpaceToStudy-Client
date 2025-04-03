import RadioButton from '~/design-system/components/radio-button/RadioButton'
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { RadioButtonType } from '~/types'
import { styles } from './RadioButtonInputs.styles'

interface RadioButtonInputsProps<T> extends Omit<RadioGroupProps, 'onChange'> {
  items: RadioButtonType<T>[]
  onChange: (value: string) => void
  value: T
  title?: string
}

const RadioButtonInputs = <T,>({
  onChange,
  items,
  value,
  title
}: RadioButtonInputsProps<T>) => {
  const handleValueUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const radioButtonList = items.map((radio) => (
    <FormControlLabel
      checked={value === radio.value}
      control={<RadioButton label='' />}
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
