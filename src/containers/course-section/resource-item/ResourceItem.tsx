import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import EditIcon from '@mui/icons-material/Edit'

import AppSelect from '~/components/app-select/AppSelect'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'

import {
  CourseResource,
  ResourceAvailabilityStatusEnum,
  ResourcesAvailabilityEnum,
  ResourcesTabsEnum as ResourcesTypes,
  SetResourseAvailability,
  SizeEnum
} from '~/types'

import {
  availabilityIcons,
  selectionFields
} from '~/containers/course-section/resource-item/ResourceItem.constants'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

interface ResourceItemProps {
  resource: CourseResource
  resourceType?: ResourcesTypes
  deleteResource?: (resource: CourseResource) => void
  setResourceAvailability?: SetResourseAvailability
  editResource?: (resource: CourseResource) => void
  isView?: boolean
}

const ResourceItem: FC<ResourceItemProps> = ({
  resource,
  resourceType,
  deleteResource,
  setResourceAvailability,
  editResource,
  isView = false
}) => {
  const handleDeleteResource = () => {
    deleteResource?.(resource)
  }

  const handleEditResource = () => {
    editResource?.(resource)
  }

  const { t } = useTranslation()

  const { resourceAvailability: allResourcesAvailability, isCooperation } =
    useResourceAvailabilityContext()

  const renderResourceIcon = () => {
    const { Lessons, Quizzes } = ResourcesTypes

    const type = resourceType || resource.resourceType

    switch (type) {
      case Lessons:
        return resourcesData.lessons.icon
      case Quizzes:
        return resourcesData.quizzes.icon
      default:
        return null
    }
  }

  const resourceAvailability = resource.availability

  const resourceAvailabilityStatus =
    resourceAvailability?.status ?? ResourceAvailabilityStatusEnum.Open

  const shouldShowDatePicker =
    resourceAvailabilityStatus === ResourceAvailabilityStatusEnum.OpenFrom

  const setOpenFromDate = (value: Date | null) => {
    setResourceAvailability?.(resource._id, {
      status: resourceAvailabilityStatus,
      date: value
    })
  }

  const setAvailabilityStatus = useCallback(
    (status: ResourceAvailabilityStatusEnum) => {
      setResourceAvailability?.(resource._id, {
        status: status,
        date: null
      })
    },
    [resource._id, setResourceAvailability]
  )

  useEffect(() => {
    if (allResourcesAvailability === ResourcesAvailabilityEnum.OpenManually) {
      setAvailabilityStatus(ResourceAvailabilityStatusEnum.Closed)
    } else {
      setAvailabilityStatus(ResourceAvailabilityStatusEnum.Open)
    }
  }, [allResourcesAvailability, setAvailabilityStatus])

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
              disablePast
              inputFormat={'MMM d, yyyy'}
              label={t('cooperationDetailsPage.datePickerLabel')}
              onChange={setOpenFromDate}
              renderInput={(params) => <TextField {...params} />}
              value={resourceAvailability.date ?? null}
            />
          </Box>
        </LocalizationProvider>
      )}
      <AppSelect
        fields={selectionFields}
        setValue={(value) => setAvailabilityStatus(value)}
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
      <IconButton aria-label='edit' onClick={handleEditResource}>
        <EditIcon fontSize={SizeEnum.Small} sx={styles.editBtn} />
      </IconButton>
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
