import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';

type CheckboxListProps = {
    items: {title:string, checked: boolean, handleChecked: (e:ChangeEvent<HTMLInputElement>, checked: boolean) => void}[]
    title:string
}

const CheckboxList = ({ items, title = '' }:CheckboxListProps):JSX.Element => {
  const checkboxes = items.map(item => (
  <Box>
    <Checkbox value={item.checked} onChange={item.handleChecked} />
    <Typography>{item.title}</Typography>
  </Box>
  )
  return (
    <Box>
        <Typography>{title}</Typography>
        {checkboxes}
    </Box>
  )
}

export default CheckboxList
