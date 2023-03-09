import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'

import { cardsViews } from '~/constants'
import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

const ViewSwitcher = ({ setOffersView, offersView }) => {
  const changeOffersView = (_event, view) => setOffersView(view)

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
