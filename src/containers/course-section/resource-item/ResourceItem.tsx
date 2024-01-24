import { FC, ReactElement, useEffect } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import AppSelect from '~/components/app-select/AppSelect'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { useResourceAvailabilityContext } from '~/context/resources-availability-context'
import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import openFrom from '~/assets/img/cooperation-details/resource-availability/open-from.svg'
import closedIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'

import {
  CourseResources,
  ResourceAvailabilityStatus,
  ResourcesAvailability,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

import { selectionFields } from '~/containers/course-section/resource-item/ResourceItem.constants'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

interface ResourceItemProps {
  resource: CourseResources
  deleteResource: (resource: CourseResources) => void
  setResourceAvailability: (
    id: string,
    availability: ResourceAvailabilityStatus,
    openFromDate: string | null
  ) => void
}

const availabilityIcons = {
  open: openIcon,
  openFrom: openFrom,
  closed: closedIcon
}

const ResourceItem: FC<ResourceItemProps> = ({
  resource,
  deleteResource,
  setResourceAvailability
}) => {
  const onDeleteResource = () => {
    deleteResource(resource)
  }

  const { resourceAvailability, isCooperation } =
    useResourceAvailabilityContext()

  const setResourceIcon = (): ReactElement | undefined => {
    if (resource.resourceType === ResourcesTypes.Lessons) {
      return resourcesData.lessons.icon
    } else if (resource.resourceType === ResourcesTypes.Quizzes) {
      return resourcesData.quizzes.icon
    }
  }

  const resourceAvailabilityStatus =
    resource.resourceAvailability || ResourceAvailabilityStatus.open
  const displayDatePicker =
    resourceAvailabilityStatus === ResourceAvailabilityStatus.openFrom

  const setDate = (value: string | null) => {
    setResourceAvailability(resource._id, resourceAvailabilityStatus, value)
  }

  const setStatus = (status: ResourceAvailabilityStatus) => {
    setResourceAvailability(resource._id, status, null)
  }

  useEffect(() => {
    if (resourceAvailability === ResourcesAvailability.openManually) {
      setStatus(ResourceAvailabilityStatus.closed)
    } else {
      setStatus(ResourceAvailabilityStatus.open)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceAvailability])

  const availabilitySelection = (
    <Box sx={styles.availabilitySelectionContainer}>
      {!displayDatePicker && (
        <Box
          alt='resource icon'
          component='img'
          src={availabilityIcons[resourceAvailabilityStatus]}
          sx={styles.availabilityIcon}
        />
      )}
      {displayDatePicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={styles.datePicker}>
            <Box
              alt='resource icon'
              component='img'
              src={availabilityIcons[resourceAvailabilityStatus]}
              sx={styles.availabilityIcon}
            />
            <DatePicker
              disablePast
              inputFormat={'MMM d, yyyy'}
              label='Opening date'
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
              value={resource.openFromDate || null}
            />
          </Box>
        </LocalizationProvider>
      )}
      <AppSelect
        fields={selectionFields}
        setValue={(value) => setStatus(value as ResourceAvailabilityStatus)}
        sx={styles.availabilitySelect}
        value={resourceAvailabilityStatus}
      />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      <IconExtensionWithTitle
        description={resource.description ?? ''}
        icon={setResourceIcon()}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <Box sx={styles.resourceActions}>
        {isCooperation && availabilitySelection}
        <IconButton onClick={onDeleteResource}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ResourceItem
