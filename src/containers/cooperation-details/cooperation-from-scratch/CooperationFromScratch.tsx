import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppSelect from '~/components/app-select/AppSelect'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'

import { cooperationTranslationKeys } from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.constans'
import { styles } from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.styles'
import { ResourcesAvailability } from '~/types'
import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import closeIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'

const CooperationFromScratch = () => {
  const { t } = useTranslation()

  const { resourceAvailability, setResourceAvailability } =
    useResourceAvailabilityContext()

  const cooperationOption = cooperationTranslationKeys.map(
    ({ title, value }) => ({
      title: t(title),
      value
    })
  )

  return (
    <Box data-testid='coop-from-scratch' sx={styles.root}>
      <Box sx={styles.publishBlock}>
        <Box>
          <Box sx={styles.lockBlock}>
            <Box
              alt='rescource icon'
              component='img'
              src={
                resourceAvailability === ResourcesAvailability.openAll
                  ? openIcon
                  : closeIcon
              }
            />
            <Typography sx={styles.lockTitle}>
              {t('cooperationDetailsPage.publish')}
              {t(
                `cooperationDetailsPage.select.${
                  resourceAvailability === ResourcesAvailability.openAll
                    ? 'openAll'
                    : 'openManually'
                }`
              )}
            </Typography>
          </Box>
          <Typography sx={styles.lockSubtitle}>
            {t(
              `cooperationDetailsPage.${
                resourceAvailability === ResourcesAvailability.openAll
                  ? 'allResources'
                  : 'manuallyResources'
              }`
            )}
          </Typography>
        </Box>
        <Box>
          <AppSelect
            fields={cooperationOption}
            setValue={setResourceAvailability}
            sx={styles.resourcesSelect}
            value={resourceAvailability}
          />
        </Box>
      </Box>
      <CooperationActivitiesList />
    </Box>
  )
}

export default CooperationFromScratch
