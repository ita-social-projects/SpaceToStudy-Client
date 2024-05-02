import {
  FC,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useMemo
} from 'react'
import {
  DndContext,
  Active,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  DragEndEvent,
  TouchSensor
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import DragHandle from '~/components/drag-handle/DragHandle'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { styles } from '~/containers/course-section/resources-list/ResourcesList.styles'

import useDroppable from '~/hooks/use-droppable'
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
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item._id === active?.id),
    [active, items]
  )

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active && over) {
        setResources((prevResources) => {
          const activeIndex = prevResources.findIndex(
            (item) => item._id === active.id
          )
          const overIndex = prevResources.findIndex(
            (item) => item._id === over.id
          )
          if (activeIndex !== -1 && overIndex !== -1) {
            return arrayMove(prevResources, activeIndex, overIndex)
          }
          return prevResources
        })
      }
    },
    [setResources]
  )

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

  return (
    <DndContext
      onDragCancel={() => {
        setActive(null)
      }}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      sensors={sensors}
    >
      {enabled && (
        <>
          <SortableContext
            items={items.map((item) => item._id)}
            strategy={verticalListSortingStrategy}
          >
            <Box sx={styles.root}>{resourceItems}</Box>
          </SortableContext>
          <DragOverlay>
            {activeItem && renderItem(activeItem, true)}
          </DragOverlay>
        </>
      )}
    </DndContext>
  )
}

export default ResourcesList
