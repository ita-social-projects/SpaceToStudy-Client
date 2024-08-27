import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { cooperationTranslationKeys } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.constants'
import { styles } from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.styles'

import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import closeIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'

import { cooperationService } from '~/services/cooperation-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { openAlert } from '~/redux/features/snackbarSlice'
import {
  cooperationsSelector,
  setResourcesAvailability
} from '~/redux/features/cooperationsSlice'

import { snackbarVariants } from '~/constants'
import {
  ResourcesAvailabilityEnum,
  ButtonVariantEnum,
  SizeEnum,
  ButtonTypeEnum,
  ErrorResponse,
  UpdateCooperationsSections,
  UpdateCooperationsParams
} from '~/types'

import useAxios from '~/hooks/use-axios'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { getErrorKey } from '~/utils/get-error-key'
import { getErrorMessage } from '~/utils/error-with-message'

interface CooperationActivitiesProps {
  cooperationId?: string
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const CooperationActivities: FC<CooperationActivitiesProps> = ({
  cooperationId,
  setEditMode
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { sections, resourcesAvailability } =
    useAppSelector(cooperationsSelector)

  const handleResourcesAvailabilityChange = (
    status: ResourcesAvailabilityEnum
  ) => {
    dispatch(setResourcesAvailability(status))
  }

  const onSaveCooperation = () => {
    void updateCooperation({
      _id: cooperationId,
      sections
    })
  }

  const onUpdateResponse = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.acceptModal.successMessage'
      })
    )
    setEditMode((prev: boolean) => !prev)
  }, [dispatch, setEditMode])

  const onResponseError = useCallback(
    (error?: ErrorResponse) => {
      const errorKey = getErrorKey(error)
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error
            ? {
                text: errorKey,
                options: {
                  message: getErrorMessage(error.message)
                }
              }
            : errorKey
        })
      )
    },
    [dispatch]
  )

  const updateCooperationService = (
    data: UpdateCooperationsParams | UpdateCooperationsSections
  ) => cooperationService.updateCooperation(data)

  const { fetchData: updateCooperation } = useAxios({
    service: updateCooperationService,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: onUpdateResponse,
    onResponseError
  })

  const cooperationOption = cooperationTranslationKeys.map(
    ({ title, value }) => ({
      title: t(title),
      value
    })
  )

  const imgSrc =
    resourcesAvailability === ResourcesAvailabilityEnum.OpenAll
      ? openIcon
      : closeIcon

  return (
    <Box>
      <Box sx={styles.root}>
        <Box sx={styles.publishBlock}>
          <Box>
            <Box sx={styles.lockBlock}>
              <img alt='resource icon' src={imgSrc} />
              <Typography sx={styles.lockTitle}>
                {t('cooperationDetailsPage.publish')}
                {t(`cooperationDetailsPage.select.${resourcesAvailability}`)}
              </Typography>
            </Box>
            <Typography sx={styles.lockSubtitle}>
              {t(`cooperationDetailsPage.${resourcesAvailability}`)}
            </Typography>
          </Box>
          <Box>
            <AppSelect
              fields={cooperationOption}
              setValue={handleResourcesAvailabilityChange}
              sx={styles.resourcesSelect}
              value={resourcesAvailability}
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
          onClick={onSaveCooperation}
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
