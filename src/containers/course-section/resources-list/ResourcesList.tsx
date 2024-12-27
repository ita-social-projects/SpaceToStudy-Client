import { FC } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import DragHandle from '~/components/drag-handle/DragHandle'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { styles } from '~/containers/course-section/resources-list/ResourcesList.styles'

import { CourseResource, ResourceAvailability, Resource } from '~/types'

import useDroppable from '~/hooks/use-droppable'
import useDndSensor from '~/hooks/use-dnd-sensor'

interface ResourcesListProps {
  cooperationData?: Resource[]

  sortResources: (resources: CourseResource[]) => void
  deleteResource: (resource: CourseResource) => void
  editResource: (resource: CourseResource) => void
  updateAvailability?: (
    resource: CourseResource,
    availability: ResourceAvailability
  ) => void
  isCooperation?: boolean
}
export const renderItem = (
  item: CourseResource,
  availability: ResourceAvailability,
  deleteResource: (resource: CourseResource) => void,
  editResource: (resource: CourseResource) => void,
  isCooperation: boolean,
  updateAvailability?: (
    resource: CourseResource,
    availability: ResourceAvailability
  ) => void,
  isDragOver = false
) => (
  <SortableWrapper
    id={item.id}
    key={item.id}
    onDragEndStyles={styles.section(isDragOver)}
    onDragStartStyles={styles.section(true)}
  >
    <DragHandle iconStyles={styles.dragIcon} />
    <ResourceItem
      availability={availability}
      deleteResource={deleteResource}
      editResource={editResource}
      isCooperation={isCooperation}
      key={item.id}
      resource={item}
      updateAvailability={updateAvailability}
    />
  </SortableWrapper>
)
const ResourcesList: FC<ResourcesListProps> = ({
  cooperationData = [],
  sortResources,
  deleteResource,
  editResource,
  updateAvailability,
  isCooperation = false
}) => {
  const { enabled } = useDroppable()

  const itemsForSort: CourseResource[] = cooperationData.map(
    (item) => item.resource
  )

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({
    items: itemsForSort,
    setItems: (newItems) => {
      sortResources(newItems)
      if (activeItem) {
        const activeResource = cooperationData.find(
          (item) => item.resource.id === activeItem.id
        )
        if (activeResource) {
          updateResourceAvailability([activeResource])
        }
      }
      const inactiveResources = cooperationData.filter(
        (item) => item.resource.id !== activeItem?.id
      )
      updateResourceAvailability(inactiveResources)
    },
    idProp: 'id'
  })
  const renderNewItem = (
    item: CourseResource,
    availability: ResourceAvailability,
    isDragOver = false
  ) =>
    renderItem(
      item,
      availability,
      deleteResource,
      editResource,
      isCooperation,
      updateAvailability,
      isDragOver
    )
  const updateResourceAvailability = (items: Resource[]) => {
    items.forEach((item) => {
      if (item.availability && updateAvailability) {
        updateAvailability(item.resource, item.availability)
      }
    })
  }
  const resourceItems = cooperationData?.map((item) => {
    return renderNewItem(
      item.resource,
      item.availability as ResourceAvailability
    )
  })
  const getAvailabilityForActiveItem = (id: string | null) => {
    return cooperationData.find((item) => item.resource.id === id)
      ?.availability as ResourceAvailability
  }
  const resourceListContent = enabled && (
    <>
      <SortableContext
        items={cooperationData?.map((item) => item.resource.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={styles.root}>{resourceItems}</Box>
      </SortableContext>
      <DragOverlay>
        {activeItem &&
          renderNewItem(
            activeItem,
            activeItem.availability ||
              getAvailabilityForActiveItem(activeItem.id),
            false
          )}
      </DragOverlay>
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
