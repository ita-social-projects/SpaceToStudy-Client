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

import Question from '~/components/question/Question'

import { styles } from '~/containers/questions-list/QuestionsList.styles'
import { QuestionWithCategory } from '~/types'

interface QuestionsListProps {
  items: QuestionWithCategory[]
  setItems: (items: QuestionWithCategory[]) => void
}

const QuestionsList: FC<QuestionsListProps> = ({ items, setItems }) => {
  const reorder = (
    list: QuestionWithCategory[],
    startIndex: number,
    endIndex: number
  ): QuestionWithCategory[] => {
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

    setItems(reorderedItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='draggable'>
        {(provided: DroppableProvided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, i) => (
              <Draggable
                draggableId={item.question._id}
                index={i}
                key={item.question._id}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <Box
                    ref={provided.innerRef}
                    sx={styles.question(snapshot.isDragging)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Question {...item} />
                  </Box>
                )}
              </Draggable>
            ))}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default QuestionsList
