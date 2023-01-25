import { useState } from 'react'
import { Chip, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/components/app-chips/AppChips-styles'

const AppChip = ({ items, stepLabel, handleData, defaultQuantity }) => {
  const [isOpen, setIsOpen] = useState(false)
  const lengthOfArray = isOpen ? items.length : defaultQuantity
  const itemsSlice = items.slice(0, lengthOfArray)
  const amountOfChips = items.length - defaultQuantity > 0 ? items.length - defaultQuantity : null

  const handleDelete = (name) => {
    const newItems = items.filter((item) => item.name !== name)
    if (newItems.length <= defaultQuantity) {
      setIsOpen(false)
    }
    handleData(stepLabel, newItems)
  }

  const showMore = () => {
    setIsOpen(true)
  }

  const listOfItems =
    items.length > 0 &&
    itemsSlice.map((item) => (
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
        key={ item.name }
        label={ <Typography variant='body2'>
          { `${item.name}` }
        </Typography> }
        onDelete={ () => handleDelete(item.name) }
        sx={ styles.chip }
      />
    ))

  return (
    <Box sx={ styles.feature }>
      { listOfItems }
      { !isOpen && amountOfChips && (
        <Chip
          data-testid='amount-of-chips' label={ `+${amountOfChips}` } onClick={ showMore }
          sx={ styles.chip }
        />
      ) }
    </Box>
  )
}

export default AppChip
