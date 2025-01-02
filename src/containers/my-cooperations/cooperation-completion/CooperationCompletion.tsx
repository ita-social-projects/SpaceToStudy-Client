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
  CooperationMaterialsAccessEnum,
  UserRoleEnum,
  StatusEnum
} from '~/types'
interface CooperationCompletionProps {
  cooperationStatus: StatusEnum
  onCloseCooperation: () => void
  userRole: UserRoleEnum | ''
}

const CooperationCompletion: React.FC<CooperationCompletionProps> = ({
  cooperationStatus,
  onCloseCooperation,
  userRole
}) => {
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
          data-testid='close-cooperation-btn'
          disabled={cooperationStatus !== StatusEnum.Active}
          onClick={onCloseCooperation}
          size={SizeEnum.Medium}
          sx={styles.closeBtn}
          variant={ButtonVariantEnum.Text}
        >
          {t('cooperationsPage.cooperationDetails.closeCooperationBtn')}
        </AppButton>
      </SettingItem>
      {userRole === UserRoleEnum.Tutor && (
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
      )}
    </Box>
  )
}

export default CooperationCompletion
