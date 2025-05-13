import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/system/Box'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AppSelect from '~/components/app-select/AppSelect'

import {
  resourceIcons,
  selectionFields
} from '~/containers/course-section/resource-item/ResourceItem.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'
import {
  Attachment,
  CourseResource,
  ResourceAvailability,
  ResourceAvailabilityStatusEnum,
  ResourcesTypesEnum as ResourceType,
  SizeEnum
} from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ResourceAction from '~/containers/course-section/resource-item/resource-action/ResourceAction'

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
  isStudent?: boolean
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
  isStudent,
  isView = false,
  isCooperation = false
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isDuplicate } = resource
  const routeMap = {
    [ResourceType.Lesson]: 'lesson-details/',
    [ResourceType.Quiz]: 'quizzes/'
  }

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
      {formattedDate ??
        t(`cooperationDetailsPage.resourceSelection.${status}`, status)}
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

  const isAttachment = (
    resource: CourseResource,
    type: ResourceType
  ): resource is Attachment => {
    return (
      resource.resourceType === ResourceType.Attachment &&
      type === ResourceType.Attachment
    )
  }

  const isNotViewableOrClosed =
    !isView || status !== ResourceAvailabilityStatusEnum.Open
  const resolvedResourceType = resourceType ?? resource.resourceType

  const onAttachmentNameClick = () => {
    if (isNotViewableOrClosed || !isStudent) return

    if (isAttachment(resource, resolvedResourceType)) {
      window.open(resource.link, '_blank')
    }
  }

  const onResourceItemClick = () => {
    if (isNotViewableOrClosed) return

    if (
      resolvedResourceType === ResourceType.Lesson ||
      resolvedResourceType === ResourceType.Quiz
    ) {
      navigate(
        `${routeMap[resolvedResourceType]}${
          resource._id
        }${resolvedResourceType === ResourceType.Quiz ? '/attempts' : ''}`
      )
    }
  }

  return (
    <Box
      data-testid='resourceItem'
      onClick={onResourceItemClick}
      sx={styles.container(isView)}
    >
      <Box
        onClick={onAttachmentNameClick}
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
      <ResourceAction
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent={isStudent ?? false}
        isView={isView}
        resource={resource}
        status={status}
      />
    </Box>
  )
}

export default ResourceItem
