import { FC, useCallback, useEffect } from 'react'
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
  const { resourcesAvailability } = useAppSelector(cooperationsSelector)

  const { isDuplicate, description } = resource

  useEffect(() => {
    resourcesAvailability === ResourcesAvailabilityEnum.OpenManually &&
      setAvailabilityStatus(ResourceAvailabilityStatusEnum.Closed)
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
    const type = resourceType || resource.resourceType
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
              value={availability?.date ?? null}
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

  return (
    <Box sx={styles.container(isView)}>
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
