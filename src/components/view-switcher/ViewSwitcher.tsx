import { FC, MouseEvent } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'


import { styles } from '~/components/view-switcher/ViewSwitcher.styles'
import { cardsViews } from '~/constants'
import { CardsViewTypes } from '~/types/findOffers/viewSwitcher.types'


interface ViewSwitcherProps {
  setOffersView:(value: CardsViewTypes) => void
  offersView: CardsViewTypes
}

const ViewSwitcher: FC<ViewSwitcherProps> = ({ setOffersView, offersView }) => {
  const changeOffersView = (_event:MouseEvent<HTMLElement>, view: CardsViewTypes) => setOffersView(view)

  return (
    <Box>
      <ToggleButton
        aria-label='inline card view'
        onClick={ changeOffersView }
        selected={ offersView === cardsViews.inline }
        sx={ styles.inlineButton }
        value={ cardsViews.inline }
      >
        <FormatListBulletedIcon sx={ styles.icon } />
      </ToggleButton>
      <ToggleButton
        aria-label='grid card view'
        onClick={ changeOffersView }
        selected={ offersView === cardsViews.grid }
        sx={ styles.gridButton }
        value={ cardsViews.grid }
      >
        <GridViewIcon sx={ styles.icon } />
      </ToggleButton>
    </Box>
  )
}

export default ViewSwitcher
