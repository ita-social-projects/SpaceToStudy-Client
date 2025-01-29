import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import Button from '~scss-components/button/Button'

import { styles } from '~/components/cards-list/CardsList.styles'

interface CardsListProps {
  btnText: string
  cards: ReactElement[]
  isExpandable?: boolean
  loading?: boolean
  onClick: () => void
}

const CardsList: FC<CardsListProps> = ({
  btnText,
  cards,
  isExpandable = true,
  loading,
  onClick
}) => {
  return (
    <Box>
      {loading && !cards.length ? (
        <Box sx={styles.loaderContainer}>
          <Loader pageLoad size={50} />
        </Box>
      ) : (
        <Box sx={styles.cardsContainer}>{cards}</Box>
      )}

      {isExpandable && (
        <Button
          loading={loading}
          onClick={onClick}
          size='md'
          sx={styles.btn}
          variant='tonal'
        >
          {btnText}
        </Button>
      )}
    </Box>
  )
}
export default CardsList
