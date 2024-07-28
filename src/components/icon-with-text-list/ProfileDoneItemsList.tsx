import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PopoverOrigin } from '@mui/material'

import AppPopover from '../app-popover/AppPopover'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/icon-with-text-list/ProfileDoneItemsList.style'
import { ProfileDoneItem } from '~/types'

interface ProfileDoneItemsListProps {
  items: ProfileDoneItem[]
  icon: JSX.Element
  defaultQuantity: number
}

const ProfileDoneItemsList: FC<ProfileDoneItemsListProps> = ({
  items,
  icon,
  defaultQuantity
}) => {
  const { t } = useTranslation()
  const shouldShowMore = items.length > defaultQuantity

  const itemsList = items.map((item) => (
    <Box key={item.title} sx={styles.itemWrapper}>
      <Box>{icon}</Box>

      <TitleWithDescription
        description={item.description}
        style={styles.titleWithDescription}
        title={item.title}
      />
    </Box>
  ))

  const showMoreElem = (
    <Typography sx={styles.showMore}>
      {t('userProfilePage.profileInfo.showMore')}
    </Typography>
  )

  const initialItems = (
    <Box sx={styles.container}>{itemsList.slice(0, defaultQuantity)}</Box>
  )

  return (
    <AppPopover
      TransitionProps={{ timeout: 500 }}
      anchorOrigin={styles.anchorOrigin as PopoverOrigin}
      hideElem
      initialItems={initialItems}
      initialItemsWrapperStyle={null}
      showMoreElem={shouldShowMore && showMoreElem}
      slotProps={{ paper: { sx: styles.paperProps } }}
    >
      <Box sx={{ ...styles.container }}>{itemsList}</Box>
    </AppPopover>
  )
}

export default ProfileDoneItemsList
