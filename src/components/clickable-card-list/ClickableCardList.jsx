import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { styles } from '~/components/clickable-card-list/ClickableCardList.styles'

const ClickableCardList = ({
  btnText,
  cards,
  isBlur,
  isExpandable,
  onClick
}) => {
  const hideBtn = !isExpandable && { visibility: 'hidden' }
  const blurCards = isBlur && { filter: 'blur(10px)' }

  return (
    <Box>
      <Box sx={[styles.cardsContainer, blurCards]}>{cards}</Box>

      <Button
        onClick={onClick}
        size='extraLarge'
        sx={[styles.btn, hideBtn]}
        variant='tonal'
      >
        {btnText}
      </Button>
    </Box>
  )
}
export default ClickableCardList
