import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

import { styles } from './CheckboxList.styles'

interface CheckboxListProps extends Pick<TypographyProps, 'variant'> {
  items: string[]
  value: string[]
  title?: string
  onChange: (checkbox: string[]) => void
}

const CheckboxList: FC<CheckboxListProps> = ({ items, value=[], title, variant, onChange }) => { 
  const { t } = useTranslation()

  const handleCheckbox = (checkbox: string) => {
    const updatedCheckboxes = value.includes(checkbox) ? value.filter(el => el!==checkbox) : [...value, checkbox]
    onChange(updatedCheckboxes)
  }

  const checkboxesList = items.map((checkbox) => (
    <FormControlLabel
      checked={ value.includes(checkbox) }
      control={ <Checkbox inputProps={ { 'aria-label': checkbox } } sx={ styles.checkbox  } /> } 
      key={ checkbox }
      label={ 
        <Typography variant={ variant }>
          { t(checkbox) }
        </Typography> 
      }
      onChange={ () => handleCheckbox(checkbox) }
    />
  ))

  const checkboxesTitle = title && (
    <Typography aria-label='checkboxes-list-title' sx={ styles.title } variant='h6' >
      { t(title) }
    </Typography>
  )

  return (
    <Box sx={ styles.root }>
      { checkboxesTitle }
      { checkboxesList }
    </Box>
  )
}

export default CheckboxList
