import { FC, MouseEvent } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'

import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

import { CardsViewEnum, CardsView } from '~/types'

interface ViewSwitcherProps {
  onChange: (value: CardsView) => void
  value: CardsView
}

const ViewSwitcher: FC<ViewSwitcherProps> = ({ onChange, value }) => {
  const changeOffersView = (_event: MouseEvent<HTMLElement>, view: CardsView) =>
    onChange(view)

  return (
    <Box sx={styles.root}>
      <ToggleButton
        aria-label='inline card view'
        onClick={changeOffersView}
        selected={value === CardsViewEnum.Inline}
        sx={styles.inlineButton}
        value={CardsViewEnum.Inline}
      >
        <FormatListBulletedIcon sx={styles.icon} />
      </ToggleButton>
      <ToggleButton
        aria-label='grid card view'
        onClick={changeOffersView}
        selected={value === CardsViewEnum.Grid}
        sx={styles.gridButton}
        value={CardsViewEnum.Grid}
      >
        <GridViewIcon sx={styles.icon} />
      </ToggleButton>
    </Box>
  )
}

export default ViewSwitcher
