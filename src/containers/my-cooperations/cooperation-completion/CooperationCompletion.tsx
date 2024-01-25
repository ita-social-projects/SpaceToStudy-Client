import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import SettingItem from '~/components/setting-item/SettingItem'
import AppButton from '~/components/app-button/AppButton'
import AppSelect from '~/components/app-select/AppSelect'

import { cooperationAccessValues } from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion.constants'
import { styles } from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion.styles'
import {
  ButtonVariantEnum,
  SizeEnum,
  CooperationMaterialsAccessEnum
} from '~/types'

const CooperationCompletion = () => {
  const { t } = useTranslation()

  const [materialsAccess, setMaterialsAccess] =
    useState<CooperationMaterialsAccessEnum>(
      CooperationMaterialsAccessEnum.OneMonthAccess
    )

  return (
    <Box>
      <Divider />
      <Typography sx={styles.title}>
        {t('cooperationsPage.cooperationDetails.completionTitle')}
      </Typography>
      <SettingItem
        subtitle={t(
          'cooperationsPage.cooperationDetails.closeCooperationDescription'
        )}
        title={t('cooperationsPage.cooperationDetails.closeCooperationTitle')}
      >
        <AppButton
          size={SizeEnum.Medium}
          sx={styles.closeBtn}
          variant={ButtonVariantEnum.Text}
        >
          {t('cooperationsPage.cooperationDetails.closeCooperationBtn')}
        </AppButton>
      </SettingItem>
      <SettingItem
        subtitle={t('cooperationsPage.cooperationDetails.accessDescription')}
        title={t('cooperationsPage.cooperationDetails.accessTitle')}
      >
        <AppSelect
          fields={cooperationAccessValues(t)}
          setValue={setMaterialsAccess}
          sx={styles.dropdown}
          value={materialsAccess}
        />
      </SettingItem>
    </Box>
  )
}

export default CooperationCompletion
