import { FC, MouseEvent } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'

import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

import { CardsViewEnums } from '~/types/findOffers/enums/viewSwitcher.enums'
import { CardsViewTypes } from '~/types/findOffers/types/viewSwitcher.types'

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
        selected={ offersView === CardsViewEnums.Inline }
        sx={ styles.inlineButton }
        value={ CardsViewEnums.Inline }
      >
        <FormatListBulletedIcon sx={ styles.icon } />
      </ToggleButton>
      <ToggleButton
        aria-label='grid card view'
        onClick={ changeOffersView }
        selected={ offersView === CardsViewEnums.Grid }
        sx={ styles.gridButton }
        value={ CardsViewEnums.Grid }
      >
        <GridViewIcon sx={ styles.icon } />
      </ToggleButton>
    </Box>
  )
}

export default ViewSwitcher
