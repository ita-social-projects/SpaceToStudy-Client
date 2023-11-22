import { FC } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  DroppableProvided
} from 'react-beautiful-dnd'
import Box from '@mui/material/Box'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'

import useDroppable from '~/hooks/use-droppable'
import { styles } from '~/containers/course-sections-list/CourseSectionsList.styles'
import { CourseSection, CourseResources } from '~/types'

interface CourseSectionsListProps {
  items: CourseSection[]
  setSectionsItems: (value: CourseSection[]) => void
  handleSectionInputChange: (
    id: number,
    field: keyof CourseSection,
    value: string
  ) => void
  handleSectionNonInputChange: (
    id: number,
    field: keyof CourseSection,
    value: CourseResources[]
  ) => void
}

const CourseSectionsList: FC<CourseSectionsListProps> = ({
  items,
  setSectionsItems,
  handleSectionInputChange,
  handleSectionNonInputChange
}) => {
  const { enabled } = useDroppable()
  const reorder = (
    list: CourseSection[],
    startIndex: number,
    endIndex: number
  ): CourseSection[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setSectionsItems(reorderedItems)
  }

  const sectionsList = items.map((item, i) => (
    <Draggable draggableId={item.id.toString()} index={i} key={item.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Box
          ref={provided.innerRef}
          sx={styles.section(snapshot.isDragging)}
          {...provided.draggableProps}
        >
          <Box sx={styles.dragIconWrapper} {...provided.dragHandleProps}>
            <DragIndicatorIcon sx={styles.dragIcon} />
          </Box>
          <CourseSectionContainer
            handleSectionInputChange={handleSectionInputChange}
            handleSectionNonInputChange={handleSectionNonInputChange}
            sectionData={item}
            sections={items}
            setSectionsItems={setSectionsItems}
          />
        </Box>
      )}
    </Draggable>
  ))

  return (
    <Box sx={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {enabled && (
          <Droppable droppableId='draggable'>
            {(provided: DroppableProvided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {sectionsList}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </Box>
  )
}

export default CourseSectionsList
