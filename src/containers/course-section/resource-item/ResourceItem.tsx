import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import AppSelect from '~/components/app-select/AppSelect'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import {
  availabilityIcons,
  selectionFields
} from '~/containers/course-section/resource-item/ResourceItem.constants'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

import {
  CourseResource,
  ResourceAvailability,
  ResourceAvailabilityStatusEnum,
  ResourcesTypesEnum as ResourceType,
  SizeEnum
} from '~/types'

interface ResourceItemProps {
  resource: CourseResource
  resourceType?: ResourceType
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
  deleteResource,
  editResource,
  updateAvailability,
  isView = false,
  isCooperation = false
}) => {
  const { t } = useTranslation()

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
    const { Lesson, Quiz } = ResourceType

    const type = resourceType || resource.resourceType

    switch (type) {
      case Lesson:
        return resourcesData.lessons.icon
      case Quiz:
        return resourcesData.quizzes.icon
      default:
        return null
    }
  }, [resourceType, resource.resourceType])

  const resourceAvailability = resource.availability
  const resourceAvailabilityStatus =
    resourceAvailability?.status ?? ResourceAvailabilityStatusEnum.Open

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
      {!shouldShowDatePicker && availabilityIcon}
      {shouldShowDatePicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={styles.datePicker}>
            {availabilityIcon}
            <DatePicker
              disableMaskedInput
              disablePast
              inputFormat={'MMM d, yyyy'}
              label={t('cooperationDetailsPage.datePickerLabel')}
              onChange={setOpenFromDate}
              renderInput={(params) => <TextField {...params} />}
              value={resourceAvailability?.date ?? null}
            />
          </Box>
        </LocalizationProvider>
      )}
      <AppSelect
        fields={selectionFields}
        setValue={setAvailabilityStatus}
        sx={styles.availabilitySelect}
        value={resourceAvailabilityStatus}
      />
    </Box>
  )

  const showIcon = isView ? (
    <Box>
      {resourceAvailabilityStatus === ResourceAvailabilityStatusEnum.Open &&
        availabilityIcon}
    </Box>
  ) : (
    <Box sx={styles.resourceActions}>
      {isCooperation && availabilitySelection}
      {resource.isDuplicate ? (
        <IconButton aria-label='edit' onClick={handleEditResource}>
          <EditIcon fontSize={SizeEnum.Small} sx={styles.editBtn} />
        </IconButton>
      ) : (
        <IconButton aria-label='link' onClick={handleLinkResource}>
          <LinkRoundedIcon fontSize={SizeEnum.Small} sx={styles.linkBtn} />
        </IconButton>
      )}
      <IconButton aria-label='delete' onClick={handleDeleteResource}>
        <CloseIcon fontSize={SizeEnum.Small} />
      </IconButton>
    </Box>
  )

  return (
    <Box sx={styles.container(isView)}>
      <IconExtensionWithTitle
        description={resource.description ?? ''}
        icon={renderResourceIcon()}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <Box sx={styles.resourceActions}>{showIcon}</Box>
    </Box>
  )
}

export default ResourceItem
