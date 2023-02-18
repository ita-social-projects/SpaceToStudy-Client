import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppPopover from '../app-popover/AppPopover'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/icon-with-text-list/IconWithTextList.style'

const IconWithTextList = ({ items, icon, defaultQuantity, style = styles }) => {
  const { t } = useTranslation()
  const shouldShowMore = items.length > defaultQuantity

  const itemsList = items.map((item) => (
    <Box key={ item.title } sx={ style.root }>
      <Box>
        { icon }
      </Box>

      <TitleWithDescription
        description={ item.description }
        descriptionStyles={ style.description }
        style={ { wrapper: style.wrapper } }
        title={ item.title }
        titleStyles={ style.title }
      />
    </Box>
  ))

  const showMoreElem = (<Typography sx={ styles.showMore }>
    { t('tutorProfilePage.mainInfo.showMore') }
  </Typography>)

  const initialItems = (<Box sx={ styles.container }>
    { itemsList.slice(0, defaultQuantity) }
  </Box>)

  return (
    <AppPopover
      PaperProps={ { sx: styles.paperProps } }
      TransitionProps={ { timeout: 500 } }
      anchorOrigin={ styles.anchorOrigin }
      hideElem
      initialItems={ initialItems }
      showMoreElem={ shouldShowMore && showMoreElem }
    >
      <Box sx={ { ...styles.container } }>
        { itemsList }
      </Box>
    </AppPopover>
  )
}

export default IconWithTextList
