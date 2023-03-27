import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import useShowMore from '~/hooks/use-show-more'
import ClickableCard from '~/components/clickable-card/ClickableCard'

import { styles } from '~/components/clickable-card-list/ClickableCardList.styles'

const ClickableCardList = ({ allItems, itemsToShow, itemsToAdd, btnText }) => {
  const navigate = useNavigate()

  const { items, isExpandable, showMore } = useShowMore(allItems, itemsToShow, itemsToAdd)

  const cards = items.map((item) => {
    return (
      <ClickableCard
        action={ () => navigate(item.link) }
        description={ item.description }
        img={ item.img }
        key={ item.id }
        title={ item.title }
      />
    )
  })

  const hideBtn = { display: isExpandable ? 'block' : 'none' }

  return (
    <Box>
      <Box sx={ styles.cardsContainer }>
        { cards }
      </Box>

      <Button
        onClick={ showMore } size='extraLarge' sx={ [hideBtn, styles.btn] }
        variant='tonal'
      >
        { btnText }
      </Button>
    </Box>
  )
}

export default ClickableCardList
