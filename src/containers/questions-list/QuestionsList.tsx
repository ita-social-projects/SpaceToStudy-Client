import { FC, Dispatch, SetStateAction, useState } from 'react'
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
import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import useDroppable from '~/hooks/use-droppable'

import { styles } from '~/containers/questions-list/QuestionsList.styles'
import { Question as QuestionInterface } from '~/types'

interface QuestionsListProps {
  items: QuestionInterface[]
  setItems: Dispatch<SetStateAction<QuestionInterface[]>>
}

const QuestionsList: FC<QuestionsListProps> = ({ items, setItems }) => {
  const [editableItemId, setEditableItemId] = useState<string>('')
  const { enabled } = useDroppable()

  const reorder = (
    list: QuestionInterface[],
    startIndex: number,
    endIndex: number
  ): QuestionInterface[] => {
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

  const onEditCancel = () => setEditableItemId('')

  const questionsList = items.map((item, i) => (
    <Draggable draggableId={item._id} index={i} key={item._id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Box
          ref={provided.innerRef}
          sx={styles.question(snapshot.isDragging)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editableItemId === item._id ? (
            <CreateOrEditQuizQuestion
              onCancel={onEditCancel}
              question={item}
              setQuestions={setItems}
            />
          ) : (
            <Question
              question={item}
              setEditableItemId={setEditableItemId}
              setQuestions={setItems}
            />
          )}
        </Box>
      )}
    </Draggable>
  ))

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {enabled && (
        <Droppable droppableId='draggable'>
          {(provided: DroppableProvided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {questionsList}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      )}
    </DragDropContext>
  )
}

export default QuestionsList
