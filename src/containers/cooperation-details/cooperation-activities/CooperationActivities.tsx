import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppSelect from '~/components/app-select/AppSelect'
import Button from '~scss-components/button/Button'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import {
  cooperationTranslationKeys,
  OpenFromError
} from '~/containers/cooperation-details/cooperation-activities/CooperationActivities.constants'
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
  ButtonTypeEnum,
  ResourceAvailabilityStatusEnum
} from '~/types'
import { type ResponseError } from '~/exceptions'

import useMutation from '~/hooks/use-mutation'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { getErrorKey } from '~/utils/get-error-key'
import { getErrorMessage } from '~/utils/error-with-message'

interface CooperationActivitiesProps {
  cooperationId: string
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const CooperationActivities: React.FC<CooperationActivitiesProps> = ({
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

  const checkIfOpenFromDateCorrect = useCallback(() => {
    return sections.every((section) => {
      return section.resources.every((resource) => {
        const { availability } = resource

        return (
          !availability ||
          availability.status !== ResourceAvailabilityStatusEnum.OpenFrom ||
          availability.date !== null
        )
      })
    })
  }, [sections])

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
    (error: ResponseError) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: {
            text: getErrorKey(error),
            options: {
              message: getErrorMessage(error.message)
            }
          }
        })
      )
    },
    [dispatch]
  )

  const { mutate: updateCooperation } = useMutation({
    mutationFn: cooperationService.updateCooperation,
    onSuccess: onUpdateResponse,
    onError: onResponseError
  })

  const handleSaveCooperation = useCallback(() => {
    const isOpenFromCorrect = checkIfOpenFromDateCorrect()

    if (!isOpenFromCorrect) {
      onResponseError(OpenFromError)

      return
    }

    updateCooperation({
      _id: cooperationId,
      sections
    })
  }, [
    checkIfOpenFromDateCorrect,
    cooperationId,
    onResponseError,
    sections,
    updateCooperation
  ])

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
        <Button
          component={Link}
          size='lg'
          to={authRoutes.cooperationDetails.path}
          variant='tonal'
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSaveCooperation}
          size='lg'
          type={ButtonTypeEnum.Submit}
        >
          {t('common.save')}
        </Button>
      </Box>
    </Box>
  )
}

export default CooperationActivities
