import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import { styles } from './RadioButtonInputs.styles'

const RadioButtonInputs = ({ onChange, items, value, title }) => {
  const handleValueUpdate = (event) => {
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
