import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'

import useSort from '~/hooks/table/use-sort'
import AppSelect from '~/components/app-select/AppSelect'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'

import {
  cooperationTranslationKeys,
  initialSort
} from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.constans'

import { styles } from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.styles'

const CooperationFromScratch = () => {
  const { t } = useTranslation()
  const { sort, onRequestSort } = useSort({ initialSort })

  const cooperationOption = cooperationTranslationKeys.map(
    ({ title, value }) => ({
      title: t(title),
      value
    })
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.publishBlock}>
        <Box>
          <Box sx={styles.lockBlock}>
            <LockOpenTwoToneIcon sx={styles.icon} />
            <Typography sx={styles.lockTitle}>
              {t('cooperationDetailsPage.publish')}
            </Typography>
          </Box>
          <Typography sx={styles.lockSubtitle}>
            {t('cooperationDetailsPage.allResources')}
          </Typography>
        </Box>
        <Box>
          <AppSelect
            fields={cooperationOption}
            setValue={onRequestSort}
            sx={styles.resourcesSelect}
            value={`${sort.orderBy} ${sort.order}`}
          />
        </Box>
      </Box>
      <CooperationActivitiesList />
    </Box>
  )
}

export default CooperationFromScratch
