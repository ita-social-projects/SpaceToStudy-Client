import { FC, ReactElement, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'

import AppSelect from '~/components/app-select/AppSelect'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'
import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import openFrom from '~/assets/img/cooperation-details/resource-availability/open-from.svg'
import closedIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'

import {
  CourseResources,
  ResourceAvailabilityStatusEnum,
  ResourcesAvailabilityEnum,
  ResourcesTabsEnum as ResourcesTypes,
  SizeEnum
} from '~/types'

import { selectionFields } from '~/containers/course-section/resource-item/ResourceItem.constants'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

interface ResourceItemProps {
  resource: CourseResources
  deleteResource?: (resource: CourseResources) => void
  setResourceAvailability?: (
    id: string,
    availability: ResourceAvailabilityStatusEnum,
    openFromDate: string | null
  ) => void
  editResource?: (resource: CourseResources) => void
  isView?: boolean
}

interface AvailabilityIconsProps {
  open: string
  openFrom: string
  closed: string
}

const availabilityIcons: AvailabilityIconsProps = {
  open: openIcon,
  openFrom: openFrom,
  closed: closedIcon
}

const ResourceItem: FC<ResourceItemProps> = ({
  resource,
  deleteResource,
  setResourceAvailability,
  editResource,
  isView = false
}) => {
  const onDeleteResource = () => {
    deleteResource?.(resource)
  }

  const onEditResource = () => {
    editResource?.(resource)
  }

  const { t } = useTranslation()

  const { resourceAvailability, isCooperation } =
    useResourceAvailabilityContext()

  const setResourceIcon = (): ReactElement | undefined => {
    if (resource.resourceType === ResourcesTypes.Lessons) {
      return resourcesData.lessons.icon
    } else if (resource.resourceType === ResourcesTypes.Quizzes) {
      return resourcesData.quizzes.icon
    }
  }

  const { Open, OpenFrom, Closed } = ResourceAvailabilityStatusEnum

  const resourceAvailabilityStatus = resource.availability ?? Open
  const displayDatePicker = resourceAvailabilityStatus === OpenFrom

  const setDate = (value: string | null) => {
    setResourceAvailability?.(resource._id, resourceAvailabilityStatus, value)
  }

  const setStatus = useCallback(
    (status: ResourceAvailabilityStatusEnum) => {
      setResourceAvailability?.(resource._id, status, null)
    },
    [resource._id, setResourceAvailability]
  )

  useEffect(() => {
    if (resourceAvailability === ResourcesAvailabilityEnum.OpenManually) {
      setStatus(Closed)
    } else {
      setStatus(Open)
    }
  }, [resourceAvailability, setStatus, Closed, Open])

  const availabilitySelection = (
    <Box sx={styles.availabilitySelectionContainer}>
      {!displayDatePicker && (
        <Box sx={styles.availabilityIcon}>
          <img
            alt='resource icon'
            src={availabilityIcons[resourceAvailabilityStatus]}
          />
        </Box>
      )}
      {displayDatePicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={styles.datePicker}>
            <Box sx={styles.availabilityIcon}>
              <img
                alt='resource icon'
                src={availabilityIcons[resourceAvailabilityStatus]}
              />
            </Box>
            <DatePicker
              disablePast
              inputFormat={'MMM d, yyyy'}
              label={t('cooperationDetailsPage.datePickerLabel')}
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
              value={resource.openFromDate ?? null}
            />
          </Box>
        </LocalizationProvider>
      )}
      <AppSelect
        fields={selectionFields}
        setValue={(value) => setStatus(value)}
        sx={styles.availabilitySelect}
        value={resourceAvailabilityStatus}
      />
    </Box>
  )

  const showIcon = isView ? (
    <Box>
      {resource.availability?.status ===
        ResourceAvailabilityStatusEnum.Open && (
        <Box sx={styles.availabilityIcon}>
          <img
            alt='resource icon'
            src={availabilityIcons[resourceAvailabilityStatus]}
          />
        </Box>
      )}
    </Box>
  ) : (
    <Box sx={styles.resourceActions}>
      {isCooperation && availabilitySelection}
      <IconButton aria-label='edit' onClick={onEditResource}>
        <EditIcon fontSize={SizeEnum.Small} sx={styles.editBtn} />
      </IconButton>
      <IconButton aria-label='delete' onClick={onDeleteResource}>
        <CloseIcon fontSize={SizeEnum.Small} />
      </IconButton>
    </Box>
  )

  return (
    <Box sx={styles.container(isView)}>
      <IconExtensionWithTitle
        description={resource.description ?? ''}
        icon={setResourceIcon()}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <Box sx={styles.resourceActions}>{showIcon}</Box>
    </Box>
  )
}

export default ResourceItem
