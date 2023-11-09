import { FC, Dispatch, SetStateAction } from 'react'
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

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'

import { styles } from '~/containers/course-section/resources-list/ResourcesList.styles'

import { Lesson, Quiz, Attachment } from '~/types'

interface ResourcesListProps {
  items: (Lesson | Quiz | Attachment)[]
  setResources: Dispatch<SetStateAction<(Lesson | Quiz | Attachment)[]>>
  setItemToDelete: Dispatch<SetStateAction<Lesson | Quiz | Attachment | null>>
}

const ResourcesList: FC<ResourcesListProps> = ({
  items,
  setResources,
  setItemToDelete
}) => {
  const reorder = (
    list: (Lesson | Quiz | Attachment)[],
    startIndex: number,
    endIndex: number
  ): (Lesson | Quiz | Attachment)[] => {
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

    setResources(reorderedItems)
  }

  const resourcesList = items.map((item, i) => (
    <Draggable draggableId={item._id.toString()} index={i} key={item._id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Box
          ref={provided.innerRef}
          sx={styles.section(snapshot.isDragging)}
          {...provided.draggableProps}
        >
          <Box
            className='dragIcon'
            sx={styles.dragIcon}
            {...provided.dragHandleProps}
          >
            <DragIndicatorIcon />
          </Box>
          <ResourceItem resource={item} setItemToDelete={setItemToDelete} />
        </Box>
      )}
    </Draggable>
  ))

  return (
    <Box sx={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='draggable'>
          {(provided: DroppableProvided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {resourcesList}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default ResourcesList
