import { FC } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import DragHandle from '~/components/drag-handle/DragHandle'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { styles } from '~/containers/course-section/resources-list/ResourcesList.styles'

import { CourseResource, ResourceAvailability } from '~/types'

import useDroppable from '~/hooks/use-droppable'
import useDndSensor from '~/hooks/use-dnd-sensor'

interface ResourcesListProps {
  items: CourseResource[]
  sortResources: (resources: CourseResource[]) => void
  deleteResource: (resource: CourseResource) => void
  editResource: (resource: CourseResource) => void
  updateAvailability?: (
    resource: CourseResource,
    availability: ResourceAvailability
  ) => void
  isCooperation?: boolean
}

const ResourcesList: FC<ResourcesListProps> = ({
  items,
  sortResources,
  deleteResource,
  editResource,
  updateAvailability,
  isCooperation = false
}) => {
  const { enabled } = useDroppable()

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({ items, setItems: sortResources, idProp: 'id' })

  const renderItem = (item: CourseResource, isDragOver = false) => (
    <SortableWrapper
      id={item.id}
      key={item.id}
      onDragEndStyles={styles.section(isDragOver)}
      onDragStartStyles={styles.section(true)}
    >
      <DragHandle iconStyles={styles.dragIcon} />
      <ResourceItem
        deleteResource={deleteResource}
        editResource={editResource}
        isCooperation={isCooperation}
        resource={item}
        updateAvailability={updateAvailability}
      />
    </SortableWrapper>
  )

  const resourceItems = items.map((item) => renderItem(item))

  const resourceListContent = enabled && (
    <>
      <SortableContext
        items={items.map((item) => item.id)}
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
