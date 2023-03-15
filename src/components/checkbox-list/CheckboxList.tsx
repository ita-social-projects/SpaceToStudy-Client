import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from './CheckboxList.styles'

type Checkbox = {
  title: string
  checked: boolean
}

type CheckboxListProps = {
  items: Checkbox[]
  title: string
  getCheckbox: (checkbox: Checkbox) => void
}

const CheckboxList: FC<CheckboxListProps> = ({ items, title = '', getCheckbox }) => {
  const { t } = useTranslation()

  const checkboxesList = items.map((item) => (
    <Box key={item.title} sx={styles.itemContainer}>
      <Checkbox
        onChange={() => getCheckbox(item)}
        inputProps={{ "aria-label":item.title }}
        sx={styles.checkbox}
        value={item.checked}
      />
      <Typography>{t(item.title)}</Typography>
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
