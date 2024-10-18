import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/system/Box'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AppSelect from '~/components/app-select/AppSelect'
import { cooperationsSelector } from '~/redux/features/cooperationsSlice'
import { useAppSelector } from '~/hooks/use-redux'

import {
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
import { getFormattedDate } from '~/utils/helper-functions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

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
  isDone?: boolean
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

  const { isDuplicate } = resource

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

  const status = availability?.status ?? ResourceAvailabilityStatusEnum.Open

  const shouldShowDatePicker =
    status === ResourceAvailabilityStatusEnum.OpenFrom

  const setOpenFromDate = useCallback(
    (date: Date | null) => {
      updateAvailability?.(resource, {
        status,
        date: date?.toISOString() ?? null
      })
    },
    [resource, status, updateAvailability]
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

  const formattedDate = availability?.date
    ? getFormattedDate({
        date: availability?.date,
        options: {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }
      })
    : undefined

  const availabilityIcon =
    availability?.status === ResourceAvailabilityStatusEnum.Open ? (
      <CheckCircleOutlineOutlinedIcon sx={styles.availabilityStatus.icon} />
    ) : (
      <LockOutlinedIcon sx={styles.availabilityStatus.icon} />
    )

  const availabilityStatus = (
    <Box
      sx={{
        ...styles.availabilityStatus,
        color: styles.availabilityStatus.color[status],
        background: styles.availabilityStatus.background[status]
      }}
    >
      {availabilityIcon}
      {formattedDate || status}
    </Box>
  )

  const availabilitySelection = (
    <Box sx={styles.availabilitySelectionContainer}>
      <Box
        sx={{
          ...styles.availabilitySectionIcon,
          color: styles.availabilityStatus.color[status]
        }}
      >
        {isCooperation && availabilityIcon}
      </Box>
      <AppSelect
        fields={selectionFields}
        setValue={setAvailabilityStatus}
        sx={styles.availabilitySelect}
        value={status}
      />
      {shouldShowDatePicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={styles.datePicker}>
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
    if (!isView || status !== ResourceAvailabilityStatusEnum.Open) return
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
      <Box
        sx={{
          ...styles.titleWithDescriptionWrapper,
          opacity: status !== ResourceAvailabilityStatusEnum.Open ? '60%' : ''
        }}
      >
        {renderResourceIcon()}
        <TitleWithDescription
          description={'title' in resource ? resource.title : resource.fileName}
          style={styles.titleWithDescription}
          title={resource.resourceType}
        />
      </Box>

      <Box sx={styles.resourceActions}>
        {isView ? status && availabilityStatus : actionButtons}
      </Box>
    </Box>
  )
}

export default ResourceItem
