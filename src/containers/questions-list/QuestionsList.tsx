import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useMemo
} from 'react'
import {
  DndContext,
  Active,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

import Question from '~/components/question/Question'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import { styles } from '~/containers/questions-list/QuestionsList.styles'

import useDroppable from '~/hooks/use-droppable'
import { Question as QuestionInterface } from '~/types'

interface QuestionsListProps {
  items: QuestionInterface[]
  setItems: Dispatch<SetStateAction<QuestionInterface[]>>
}

const QuestionsList: FC<QuestionsListProps> = ({ items, setItems }) => {
  const [editableItemId, setEditableItemId] = useState<string>('')
  const [active, setActive] = useState<Active | null>(null)

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const activeItem = useMemo(
    () => items.find((item) => item._id === active?.id),
    [active, items]
  )

  const { enabled } = useDroppable()

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (active && over) {
        setItems((prevItems) => {
          const activeIndex = prevItems.findIndex(
            (item) => item._id === active.id
          )
          const overIndex = prevItems.findIndex((item) => item._id === over.id)
          if (activeIndex !== -1 && overIndex !== -1) {
            return arrayMove(prevItems, activeIndex, overIndex)
          }
          return prevItems
        })
      }
    },
    [setItems]
  )

  const onEditCancel = () => setEditableItemId('')

  const questionItem = (item: QuestionInterface, isDragOver = false) => (
    <SortableWrapper
      id={item._id}
      key={item._id}
      onDragEndStyles={styles.question(isDragOver)}
      onDragStartStyles={styles.question(true)}
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
    </SortableWrapper>
  )
  const questionsList = items.map((item) => questionItem(item))

  return (
    <DndContext
      onDragCancel={() => {
        setActive(null)
      }}
      onDragEnd={onDragEnd}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      sensors={sensors}
    >
      <SortableContext
        items={items.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        {enabled && <Box>{questionsList}</Box>}
      </SortableContext>
      <DragOverlay>{activeItem && questionItem(activeItem, true)}</DragOverlay>
    </DndContext>
  )
}

export default QuestionsList
