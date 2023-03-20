import { Chip, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/components/app-chips-list/AppChipsList-styles'
import { ReactNode } from 'react'


interface AppChipProps {
  handleDelete:() => void,
  children:ReactNode,
  icon:{
    $$typeof: symbol,
    key:string,
    props:object,
    ref:string,
    type:object,
    _owner:object,
    _store:{
      validated:boolean
    }
  }
}


const AppChip:React.FC<AppChipProps> = ({ handleDelete, children, icon }) => {
  console.log(icon)
  
  return (
    <Chip
      data-testid='chip'
      deleteIcon={
        <IconButton
          data-testid='close-btn' size='small' sx={ styles.deleteButton }
          variant='plain'
        >
          <CloseIcon color='transparent' />
        </IconButton>
      }
      icon={ icon }
      label={ <Typography sx={ { typography: 'subtitle2' } }>
        { children }
      </Typography> }
      onDelete={ handleDelete }
      sx={ styles.chip }
    />
  )
}

export default AppChip
