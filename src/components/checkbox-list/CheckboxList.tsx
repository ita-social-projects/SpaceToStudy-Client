import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from './CheckboxList.styles'

import { CheckboxType } from './CheckboxList.types'

interface CheckboxListProps {
  items: CheckboxType[]
  title?: string
  getCheckbox: (checkbox: CheckboxType[]) => void
}

const CheckboxList: FC<CheckboxListProps> = ({ items, title = '', getCheckbox }) => {
  const [checkboxes,setCheckboxes] = useState<CheckboxType[]>(items)
 
  const { t } = useTranslation()

  const handleCheckbox = (checkbox: CheckboxType) => {
    setCheckboxes(prevCheckboxes => prevCheckboxes.map((prevCheckbox) => {
      if (prevCheckbox.title === checkbox.title) 
        return { ...prevCheckbox, checked: !prevCheckbox.checked }
      else 
        return prevCheckbox
    })
    )
    getCheckbox(checkboxes)
  }

  const checkboxesList = checkboxes.map((checkbox) => (
    <Box key={ checkbox.title } sx={ styles.itemContainer }>
      <Checkbox
        inputProps={ { 'aria-label': checkbox.title } }
        onChange={ () => handleCheckbox(checkbox) }
        sx={ styles.checkbox }
        value={ checkbox.checked }
      />
      <Typography>
        { t(checkbox.title) }
      </Typography>
    </Box>
  ))

  return (
    <Box>
      <Typography sx={ styles.title } variant='h6'>
        { t(title) }
      </Typography>
      { checkboxesList }
    </Box>
  )
}

export default CheckboxList
