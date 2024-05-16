import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

import AppSelect from '~/components/app-select/AppSelect'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'
import AppButton from '~/components/app-button/AppButton'
import { cooperationTranslationKeys } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.constants'
import { cooperationService } from '~/services/cooperation-service'

import { authRoutes } from '~/router/constants/authRoutes'
import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import closeIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'
import {
  ResourcesAvailabilityEnum,
  ButtonVariantEnum,
  SizeEnum,
  CourseSection,
  ButtonTypeEnum,
  ComponentEnum
} from '~/types'
import useForm from '~/hooks/use-form'
import { snackbarVariants } from '~/constants'
import { useAppDispatch } from '~/hooks/use-redux'
import { styles } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.styles'
import { openAlert } from '~/redux/features/snackbarSlice'

interface CooperationActivitiesProps {
  cooperationId?: string
}

const CooperationActivities = ({
  cooperationId
}: CooperationActivitiesProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { resourceAvailability, setResourceAvailability } =
    useResourceAvailabilityContext()

  const updateCooperationSection = async (data?: {
    sections: CourseSection[]
  }) => {
    await cooperationService.updateCooperation({
      _id: cooperationId,
      ...data
    })
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.acceptModal.successMessage'
      })
    )
  }

  const { data, handleNonInputValueChange, handleSubmit } = useForm<{
    sections: CourseSection[]
  }>({
    initialValues: { sections: [] },
    onSubmit: updateCooperationSection,
    submitWithData: true
  })

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
    <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
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
        <CooperationActivitiesList
          data={data}
          handleNonInputValueChange={handleNonInputValueChange}
        />
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
        <AppButton size={SizeEnum.ExtraLarge} type={ButtonTypeEnum.Submit}>
          {t('common.save')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CooperationActivities
