import { useState } from 'react'

import SettingItem from '~/components/setting-item/SettingItem'
import AppSelect from '~/components/app-select/AppSelect'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion.styles'

import { cooperationAccessValues } from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion.constants'
import { CooperationMaterialsAccessEnum } from '~/types'

const StudyMaterials = () => {
  const { t } = useTranslation()

  const [materialsAccess, setMaterialsAccess] =
    useState<CooperationMaterialsAccessEnum>(
      CooperationMaterialsAccessEnum.OneMonthAccess
    )

  return (
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
  )
}

export default StudyMaterials
