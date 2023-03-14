import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from './CheckboxList.styles'

const CheckboxList = ({ items, title = '', getCheckbox }) => {

  const checkboxesList = items.map(item => (
    <Box key={ item.title } sx={ styles.itemContainer } >
      <Checkbox onChange={ () => getCheckbox(item) } sx={ styles.checkbox } value={ item.checked } />
      <Typography>
        { item.title }
      </Typography>
    </Box>
  ))

  return (
    <Box>
      <Typography sx={ styles.title } variant='h6' >
        { title }
      </Typography>
      { checkboxesList }
    </Box>
  )
}

export default CheckboxList
