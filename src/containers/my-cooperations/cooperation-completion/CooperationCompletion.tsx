import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import SettingItem from '~/components/setting-item/SettingItem'
import Button from '~scss-components/button/Button'
import AppSelect from '~/components/app-select/AppSelect'
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
        <Button size='md' variant='tonal-error'>
          {t('cooperationsPage.cooperationDetails.closeCooperationBtn')}
        </Button>
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
