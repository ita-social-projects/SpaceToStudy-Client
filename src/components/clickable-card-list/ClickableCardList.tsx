import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'

import { styles } from '~/components/clickable-card-list/ClickableCardList.styles'

interface ClickableCardListProps {
  btnText: string
  cards: ReactElement[]
  isExpandable?: boolean
  loading?: boolean
  onClick: () => void
}

const ClickableCardList: FC<ClickableCardListProps> = ({
  btnText,
  cards,
  isExpandable = true,
  loading,
  onClick
}) => {
  const hideBtn = !isExpandable && { visibility: 'hidden' }

  return (
    <Box sx={styles.container}>
      {loading && !cards.length ? (
        <Loader size={50} wrapperStyles={styles.container} />
      ) : (
        <>
          <Box sx={styles.cardsContainer}>{cards}</Box>

          <AppButton
            loading={loading}
            onClick={onClick}
            size='extraLarge'
            sx={[styles.btn, hideBtn]}
            variant='tonal'
          >
            {btnText}
          </AppButton>
        </>
      )}
    </Box>
  )
}
export default ClickableCardList
