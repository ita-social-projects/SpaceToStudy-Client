import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

export default {
  title: 'Components/InputWithIcon',
  component: InputWithIcon,
  argTypes: {
    onClear: { action: 'onClear' }
  }
}

export const Default = ({ value, startIcon, sx }) => {
  const [inputValue, setValue] = useState(value)

  return (
    <InputWithIcon
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      startIcon={startIcon}
      sx={sx}
      value={inputValue}
    />
  )
}
Default.args = {
  value: '',
  startIcon: <SearchIcon sx={{ height: '42px' }} />,
  sx: {
    border: '1px solid black',
    borderRadius: '5px',
    maxWidth: '500px'
  }
}
