import { FC, Dispatch, SetStateAction, useState } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import Question from '~/components/question/Question'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import { styles } from '~/containers/questions-list/QuestionsList.styles'

import useDroppable from '~/hooks/use-droppable'
import useDndSensor from '~/hooks/use-dnd-sensor'
import { Question as QuestionInterface, CreateQuizParams } from '~/types'

interface QuestionsListProps {
  items: QuestionInterface[]
  setItems: Dispatch<SetStateAction<QuestionInterface[]>>
  handleNonInputValueChange: <K extends keyof CreateQuizParams>(
    key: K,
    value: CreateQuizParams[K]
  ) => void
}

const QuestionsList: FC<QuestionsListProps> = ({
  items,
  setItems,
  handleNonInputValueChange
}) => {
  const [editableItemId, setEditableItemId] = useState<string>('')
  const { enabled } = useDroppable()

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({
    setItems,
    items,
    idProp: '_id'
  })

  const onEditCancel = () => setEditableItemId('')

  const questionItem = (item: QuestionInterface, isDragOver = false) => {
    const questionOrQuizItem =
      editableItemId === item._id ? (
        <CreateOrEditQuizQuestion
          onCancel={onEditCancel}
          question={item}
          setQuestions={setItems}
        />
      ) : (
        <Question
          handleNonInputValueChange={handleNonInputValueChange}
          question={item}
          setEditableItemId={setEditableItemId}
          setQuestions={setItems}
        />
      )

    return (
      <SortableWrapper
        id={item._id}
        key={item._id}
        onDragEndStyles={styles.question(isDragOver)}
        onDragStartStyles={styles.question(true)}
      >
        {questionOrQuizItem}
      </SortableWrapper>
    )
  }
  const questionsList = items.map((item) => questionItem(item))

  const questionListContent = enabled && (
    <>
      <SortableContext
        items={items.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box>{questionsList}</Box>
      </SortableContext>
      <DragOverlay>{activeItem && questionItem(activeItem, true)}</DragOverlay>
    </>
  )

  return (
    <DndContext
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      {questionListContent}
    </DndContext>
  )
}

export default QuestionsList
