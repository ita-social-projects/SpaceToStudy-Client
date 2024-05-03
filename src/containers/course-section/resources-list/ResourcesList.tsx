import { FC, Dispatch, SetStateAction, useCallback } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import DragHandle from '~/components/drag-handle/DragHandle'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { styles } from '~/containers/course-section/resources-list/ResourcesList.styles'

import useDroppable from '~/hooks/use-droppable'
import useDndSensor from '~/hooks/use-dnd-sensor'
import { CourseResources, ResourceAvailabilityStatusEnum } from '~/types'

interface ResourcesListProps {
  items: CourseResources[]
  setResources: Dispatch<SetStateAction<CourseResources[]>>
  deleteResource: (resource: CourseResources) => void
  editResource: (resource: CourseResources) => void
}

const ResourcesList: FC<ResourcesListProps> = ({
  items,
  setResources,
  deleteResource,
  editResource
}) => {
  const { enabled } = useDroppable()

  const setResourceAvailability = useCallback(
    (
      id: string,
      availability: ResourceAvailabilityStatusEnum,
      openFromDate?: string | null
    ) => {
      setResources((prevResources) => {
        const resources = [...prevResources]
        const resource = resources.find((item) => item._id === id)
        if (resource) {
          resource.resourceAvailability = availability
          resource.openFromDate = openFromDate
        }
        return resources
      })
    },
    [setResources]
  )

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({ items, setItems: setResources, idProp: '_id' })

  const renderItem = (item: CourseResources, isDragOver = false) => (
    <SortableWrapper
      id={item._id}
      key={item._id}
      onDragEndStyles={styles.section(isDragOver)}
      onDragStartStyles={styles.section(true)}
    >
      <DragHandle iconStyles={styles.dragIcon} />
      <ResourceItem
        deleteResource={deleteResource}
        editResource={editResource}
        resource={item}
        setResourceAvailability={setResourceAvailability}
      />
    </SortableWrapper>
  )

  const resourceItems = items.map((item) => renderItem(item))

  const resourceListContent = enabled && (
    <>
      <SortableContext
        items={items.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={styles.root}>{resourceItems}</Box>
      </SortableContext>
      <DragOverlay>{activeItem && renderItem(activeItem, true)}</DragOverlay>
    </>
  )

  return (
    <DndContext
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      {resourceListContent}
    </DndContext>
  )
}

export default ResourcesList
