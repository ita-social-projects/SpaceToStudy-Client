import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'

import { cardsViews } from '~/constants'
import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

const ViewSwitcher = ({ setOffersView }) => {
  const [cardsView, setCardsView ] = useState(cardsViews.inline)

  const changeCardsView = (_event,view) => {
    setOffersView(view)
    setCardsView(view)
  }

  return (
    <>
      <ToggleButton
        aria-label='inline card view' onClick={ changeCardsView }
        selected={ cardsView === cardsViews.inline }
        sx={ { ...styles.toggleButton, marginRight:'8px' } }
        value={ cardsViews.inline }
      >
        <FormatListBulletedIcon sx={ styles.icon } />
      </ToggleButton>
      <ToggleButton
        aria-label='grid card view'
        onClick={ changeCardsView }
        selected={ cardsView === cardsViews.grid }
        sx={ styles.toggleButton }
        value={ cardsViews.grid }
      >
        <GridViewIcon sx={ styles.icon }  />
      </ToggleButton>
    </>
  )
}

export default ViewSwitcher
