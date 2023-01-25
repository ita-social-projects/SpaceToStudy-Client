import { useEffect, useState } from 'react'
import { Chip, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/components/app-chips/AppChips-styles'

const AppChip = ({ items, stepLabel, handleData, defaultQuantity }) => {
  const [amountOfChips, setAmountOfChips] = useState(null)
  const [arraySize, setArraySize] = useState(defaultQuantity)

  useEffect(() => {
    if (items.length <= defaultQuantity) {
      setAmountOfChips(null)
      setArraySize(defaultQuantity)
    } else if (arraySize === defaultQuantity) {
      setAmountOfChips(items.length - defaultQuantity)
    } else {
      setArraySize(items.length)
    }
  }, [items, defaultQuantity, arraySize])

  const handleDelete = (name) => {
    const newItems = items.filter((item) => item.name !== name)
    handleData(stepLabel, newItems)
  }

  const showMore = () => {
    setAmountOfChips(null)
    setArraySize(items.length)
  }

  const listOfItems =
    items.length > 0 &&
    items.slice(0, arraySize).map((item) => (
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
      { amountOfChips && (
        <Chip
          data-testid='amount-of-chips' label={ `+${amountOfChips}` } onClick={ showMore }
          sx={ styles.chip }
        />
      ) }
    </Box>
  )
}

export default AppChip
