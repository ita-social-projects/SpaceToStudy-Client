import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import { useTranslation } from 'react-i18next'

import SettingItem from '~/components/setting-item/SettingItem'
import { styles } from '~/containers/edit-tutor-profile/NotificationContainer.style'
export const NotificationContainer = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('editTutor.notificationTab.notifications')}
      </Typography>
      <Typography sx={styles.subtitle}>
        {t('editTutor.notificationTab.mainHint')}
      </Typography>

      <Box sx={styles.optionsContainer}>
        <SettingItem
          style={styles.options}
          subtitle={t('editTutor.notificationTab.offerSubtitle')}
          title={t('editTutor.notificationTab.offerStatus')}
        >
          <Switch sx={styles.switch} />
        </SettingItem>
        <SettingItem
          style={styles.options}
          subtitle={t('editTutor.notificationTab.chatSubtitle')}
          title={t('editTutor.notificationTab.chat')}
        >
          <Switch sx={styles.switch} />
        </SettingItem>
        <SettingItem
          style={styles.options}
          subtitle={t('editTutor.notificationTab.similarOffersSubtitle')}
          title={t('editTutor.notificationTab.similarOffers')}
        >
          <Switch sx={styles.switch} />
        </SettingItem>
        <SettingItem
          style={styles.options}
          subtitle={t('editTutor.notificationTab.emailSubtitle')}
          title={t('editTutor.notificationTab.email')}
        >
          <Switch sx={styles.switch} />
        </SettingItem>
      </Box>
    </Box>
  )
}
