import { useTranslation } from 'react-i18next'
import { RootState } from '~/redux/store'
import { ChangeEvent } from 'react'

import Box from '@mui/system/Box'
import Switch from '@mui/material/Switch'

import SettingItem from '~/components/setting-item/SettingItem'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/containers/edit-profile/notification-tab/NotificationTab.styles'
import { setField } from '~/redux/features/editProfileSlice'
import { notificationGroupOptions } from '~/containers/edit-profile/notification-tab/NotificationTab.constants'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { NotificationSettings } from '~/types'

const NotificationTab = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const notificationSettings = useAppSelector(
    (state: RootState) => state.editProfile.notificationSettings
  )

  const handleSwitchChange = (field: keyof NotificationSettings) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setField({
          field: 'notificationSettings',
          value: { ...notificationSettings, [field]: event.target.checked }
        })
      )
    }
  }

  const getCheckedValue = (field: keyof NotificationSettings) => {
    return notificationSettings[field]
  }

  const notificationOptionList = notificationGroupOptions.map((option) => (
    <SettingItem
      key={option.field}
      style={styles.options}
      subtitle={t(option.subtitle)}
      title={t(option.title)}
    >
      <Switch
        checked={getCheckedValue(option.field as keyof NotificationSettings)}
        onChange={handleSwitchChange(
          option.field as keyof NotificationSettings
        )}
        sx={styles.switch}
      />
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
        <Box>{notificationOptionList}</Box>
      </Box>
    </Box>
  )
}

export default NotificationTab
