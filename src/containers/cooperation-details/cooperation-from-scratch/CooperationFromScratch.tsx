import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppSelect from '~/components/app-select/AppSelect'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'

import { cooperationTranslationKeys } from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.constants'
import { styles } from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch.styles'
import { ComponentEnum, ResourcesAvailabilityEnum } from '~/types'
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

  const imgSrc =
    resourceAvailability === ResourcesAvailabilityEnum.OpenAll
      ? openIcon
      : closeIcon

  return (
    <Box data-testid='coop-from-scratch' sx={styles.root}>
      <Box sx={styles.publishBlock}>
        <Box>
          <Box sx={styles.lockBlock}>
            <Box
              alt='resource icon'
              component={ComponentEnum.Img}
              src={imgSrc}
            />
            <Typography sx={styles.lockTitle}>
              {t('cooperationDetailsPage.publish')}
              {t(`cooperationDetailsPage.select.${resourceAvailability}`)}
            </Typography>
          </Box>
          <Typography sx={styles.lockSubtitle}>
            {t(`cooperationDetailsPage.${resourceAvailability}`)}
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
