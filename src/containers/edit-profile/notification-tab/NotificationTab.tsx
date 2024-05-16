import { useTranslation } from 'react-i18next'

import Box from '@mui/system/Box'
import Switch from '@mui/material/Switch'

import SettingItem from '~/components/setting-item/SettingItem'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/containers/edit-profile/notification-tab/NotificationTab.styles'
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import { notificationGroupOptions } from '~/containers/edit-profile/notification-tab/NotificationTab.constants'

const NotificationTab = () => {
  const { t } = useTranslation()

  const handleUpdateData = () => {
    // @TODO: implement update data logic
  }

  const notificationOptionList = notificationGroupOptions.map((option) => (
    <SettingItem
      key={option.title}
      style={styles.options}
      subtitle={t(option.subtitle)}
      title={t(option.title)}
    >
      <Switch sx={styles.switch} />
    </SettingItem>
  ))

  return (
    <Box sx={styles.notificationInnerContainer}>
      <Box sx={styles.root}>
        <TitleWithDescription
          description={t('editProfilePage.profile.notificationsTab.mainHint')}
          style={styles.titleWithDescription}
          title={t('editProfilePage.profile.notificationsTab.notifications')}
        />

        <Box sx={styles.optionsContainer}>{notificationOptionList}</Box>
      </Box>
      <AppButton
        onClick={handleUpdateData}
        size={SizeEnum.ExtraLarge}
        sx={styles.updateProfileBtn}
        variant={ButtonVariantEnum.Contained}
      >
        {t('editProfilePage.profile.updateProfileBtn')}
      </AppButton>
    </Box>
  )
}

export default NotificationTab
