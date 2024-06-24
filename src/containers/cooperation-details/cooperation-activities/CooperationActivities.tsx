import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { FC } from 'react'

import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'
import { cooperationService } from '~/services/cooperation-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { cooperationsSelector } from '~/redux/features/cooperationsSlice'

import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import closeIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'
import { cooperationTranslationKeys } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.constants'
import { snackbarVariants } from '~/constants'
import {
  ResourcesAvailabilityEnum,
  ButtonVariantEnum,
  SizeEnum,
  ButtonTypeEnum
} from '~/types'
import { styles } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.styles'

interface CooperationActivitiesProps {
  cooperationId?: string
}

const CooperationActivities: FC<CooperationActivitiesProps> = ({
  cooperationId
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { sections } = useAppSelector(cooperationsSelector)
  const { resourceAvailability, setResourceAvailability } =
    useResourceAvailabilityContext()

  const updateCooperationSection = async () => {
    await cooperationService.updateCooperation({
      _id: cooperationId,
      sections
    })
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.acceptModal.successMessage'
      })
    )
  }

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
    <Box>
      <Box data-testid='coop-from-scratch' sx={styles.root}>
        <Box sx={styles.publishBlock}>
          <Box>
            <Box sx={styles.lockBlock}>
              <img alt='resource icon' src={imgSrc} />
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
      <Box sx={styles.buttons}>
        <AppButton
          component={Link}
          size={SizeEnum.ExtraLarge}
          to={authRoutes.cooperationDetails.path}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('common.cancel')}
        </AppButton>
        <AppButton
          onClick={() => void updateCooperationSection()}
          size={SizeEnum.ExtraLarge}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.save')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CooperationActivities
