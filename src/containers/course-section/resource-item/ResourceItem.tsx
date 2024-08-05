import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/system/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import AppSelect from '~/components/app-select/AppSelect'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { cooperationsSelector } from '~/redux/features/cooperationsSlice'
import { useAppSelector } from '~/hooks/use-redux'

import {
  availabilityIcons,
  resourceIcons,
  selectionFields
} from '~/containers/course-section/resource-item/ResourceItem.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

import {
  CourseResource,
  ResourceAvailability,
  ResourceAvailabilityStatusEnum,
  ResourcesAvailabilityEnum,
  ResourcesTypesEnum as ResourceType,
  SizeEnum
} from '~/types'

interface ResourceItemProps {
  resource: CourseResource
  resourceType?: ResourceType
  availability?: ResourceAvailability
  deleteResource?: (resource: CourseResource) => void
  editResource?: (resource: CourseResource) => void
  updateAvailability?: (
    resource: CourseResource,
    availability: ResourceAvailability
  ) => void
  isView?: boolean
  isCooperation?: boolean
}

const ResourceItem: FC<ResourceItemProps> = ({
  resource,
  resourceType,
  availability,
  deleteResource,
  editResource,
  updateAvailability,
  isView = false,
  isCooperation = false
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { resourcesAvailability } = useAppSelector(cooperationsSelector)

  const { isDuplicate, description } = resource

  const routeMap = {
    [ResourceType.Lesson]: 'lesson-details/',
    [ResourceType.Quiz]: 'quiz/'
  }

  useEffect(() => {
    resourcesAvailability === ResourcesAvailabilityEnum.OpenManually &&
      setAvailabilityStatus(ResourceAvailabilityStatusEnum.Closed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesAvailability])

  const handleDeleteResource = useCallback(() => {
    deleteResource?.(resource)
  }, [deleteResource, resource])

  const handleEditResource = useCallback(() => {
    editResource?.(resource)
  }, [editResource, resource])

  const handleLinkResource = useCallback(() => {
    editResource?.(resource)
  }, [editResource, resource])

  const renderResourceIcon = useCallback(() => {
    const type = resourceType ?? resource.resourceType
    return resourceIcons[type] ?? null
  }, [resourceType, resource.resourceType])

  const resourceAvailabilityStatus =
    availability?.status ?? ResourceAvailabilityStatusEnum.Open

  const shouldShowDatePicker =
    resourceAvailabilityStatus === ResourceAvailabilityStatusEnum.OpenFrom

  const setOpenFromDate = useCallback(
    (date: Date | null) => {
      updateAvailability?.(resource, {
        status: resourceAvailabilityStatus,
        date: date?.toISOString() ?? null
      })
    },
    [resource, resourceAvailabilityStatus, updateAvailability]
  )

  const setAvailabilityStatus = useCallback(
    (status: ResourceAvailabilityStatusEnum) => {
      updateAvailability?.(resource, {
        status,
        date: null
      })
    },
    [resource, updateAvailability]
  )

  const availabilityIcon = (
    <Box sx={styles.availabilityIcon}>
      <img
        alt='resource icon'
        src={availabilityIcons[resourceAvailabilityStatus]}
      />
    </Box>
  )

  const availabilitySelection = (
    <Box sx={styles.availabilitySelectionContainer}>
      {availabilityIcon}
      <AppSelect
        fields={selectionFields}
        setValue={setAvailabilityStatus}
        sx={styles.availabilitySelect}
        value={resourceAvailabilityStatus}
      />
      {shouldShowDatePicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={styles.datePicker}>
            <DatePicker
              disableMaskedInput
              disablePast
              format='MMM d, yyyy'
              label={t('cooperationDetailsPage.datePickerLabel')}
              onChange={setOpenFromDate}
              value={availability?.date ?? null}
            />
          </Box>
        </LocalizationProvider>
      )}
    </Box>
  )

  const actionButtons = (
    <Box sx={styles.resourceActions}>
      {isCooperation && availabilitySelection}
      <IconButton
        aria-label={isDuplicate ? 'edit' : 'link'}
        onClick={isDuplicate ? handleEditResource : handleLinkResource}
      >
        {isDuplicate ? (
          <EditIcon fontSize={SizeEnum.Small} sx={styles.editBtn} />
        ) : (
          <LinkRoundedIcon fontSize={SizeEnum.Small} sx={styles.linkBtn} />
        )}
      </IconButton>
      <IconButton aria-label='delete' onClick={handleDeleteResource}>
        <CloseIcon fontSize={SizeEnum.Small} />
      </IconButton>
    </Box>
  )

  const onResourceItemClick = () => {
    if (!isView) return
    const type = resourceType ?? resource.resourceType

    if (type === ResourceType.Attachment) {
      console.log('download the attachment / go to the attachment view')
      return
    }

    navigate(
      `${routeMap[type as ResourceType.Lesson | ResourceType.Quiz]}${
        resource._id
      }`
    )
  }

  return (
    <Box onClick={onResourceItemClick} sx={styles.container(isView)}>
      <IconExtensionWithTitle
        description={description ?? ''}
        icon={renderResourceIcon()}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <Box sx={styles.resourceActions}>
        {isView
          ? resourceAvailabilityStatus && availabilityIcon
          : actionButtons}
      </Box>
    </Box>
  )
}

export default ResourceItem
