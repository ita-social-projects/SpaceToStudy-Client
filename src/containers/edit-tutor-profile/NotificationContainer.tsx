import { useTranslation } from 'react-i18next'

import Box from '@mui/system/Box'
import Switch from '@mui/material/Switch'

import SettingItem from '~/components/setting-item/SettingItem'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { titleWithSubtitle } from '~/containers/edit-tutor-profile/NotificationContainer.constans'
import { styles } from '~/containers/edit-tutor-profile/NotificationContainer.style'

export const NotificationContainer = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('editTutor.notificationTab.mainHint')}
        style={styles.titleWithDescription}
        title={t('editTutor.notificationTab.notifications')}
      />

      <Box sx={styles.optionsContainer}>
        {titleWithSubtitle.map((item) => (
          <SettingItem
            key={item.id}
            style={styles.options}
            subtitle={t(item.subtitle)}
            title={t(item.title)}
          >
            <Switch sx={styles.switch} />
          </SettingItem>
        ))}
      </Box>
    </Box>
  )
}
