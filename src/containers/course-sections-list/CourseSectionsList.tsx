import { FC, MouseEvent } from 'react'
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
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Crop75Icon from '@mui/icons-material/Crop75'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'
import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import useDroppable from '~/hooks/use-droppable'
import useMenu from '~/hooks/use-menu'

import { styles } from '~/containers/course-sections-list/CourseSectionsList.styles'
import { CourseSection, CourseResources } from '~/types'
import { useModalContext } from '~/context/modal-context'
import { useCooperationContext } from '~/context/cooperation-context'

interface CourseSectionsListProps {
  items: CourseSection[]
  setSectionsItems: (value: CourseSection[]) => void
  handleSectionInputChange: (
    id: string,
    field: keyof CourseSection,
    value: string
  ) => void
  handleSectionNonInputChange: (
    id: string,
    field: keyof CourseSection,
    value: CourseResources[]
  ) => void
  handleSectionResourcesOrder?: (
    id: string,
    resources: CourseResources[]
  ) => void
  titleText: string
  isCooperation?: boolean
  addNewSection?: (index?: number) => void
}

const CourseSectionsList: FC<CourseSectionsListProps> = ({
  items,
  setSectionsItems,
  handleSectionInputChange,
  handleSectionNonInputChange,
  handleSectionResourcesOrder,
  titleText,
  isCooperation = false,
  addNewSection
}) => {
  const { enabled } = useDroppable()
  const { openMenu, renderMenu, closeMenu, anchorEl } = useMenu()
  const { openModal, closeModal } = useModalContext()
  const { setIsAddedClicked, currentSectionIndex, setCurrentSectionIndex } =
    useCooperationContext()
  const { t } = useTranslation()

  const handleActivitiesMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    openMenu(event)
    setCurrentSectionIndex(
      items.findIndex((item) => item.id === event.currentTarget.id)
    )
  }

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

  const handleMenuItemClick = () => {
    closeMenu()
    addNewSection?.(currentSectionIndex)
  }

  const openAddCourseTemplateModal = () => {
    closeMenu()
    setIsAddedClicked(false)
    openModal({
      component: <AddCourseTemplateModal closeModal={closeModal} />
    })
  }

  const addActivityMenuItems = [
    {
      id: 1,
      label: 'cooperationsPage.manyTypes.module',
      icon: <Crop75Icon sx={styles.menuIcon} />,
      onClick: handleMenuItemClick
    },
    {
      id: 2,
      label: 'cooperationsPage.manyTypes.courseTemplate',
      icon: <ViewComfyOutlinedIcon sx={styles.menuIcon} />,
      onClick: openAddCourseTemplateModal
    }
  ]

  const addActivityMenuList = addActivityMenuItems.map(
    ({ id, label, icon, onClick }) => (
      <MenuItem key={id} onClick={onClick}>
        {icon}
        {t(label)}
      </MenuItem>
    )
  )

  const sectionsList = items.map((item, i, items) => (
    <Draggable draggableId={item.id} index={i} key={item.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <>
          {isCooperation && (
            <Box
              data-testid='addActivity-container'
              sx={
                anchorEl
                  ? styles.activityButtonContainerVisible
                  : styles.activityButtonContainerDefault
              }
            >
              <Divider flexItem>
                <Typography
                  id={item.id}
                  onClick={handleActivitiesMenuClick}
                  sx={styles.activityButton}
                >
                  Add activity
                  <Add sx={styles.activityButtonIcon} />
                </Typography>
                {renderMenu(addActivityMenuList, {
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  sx: styles.menuRoot
                })}
              </Divider>
            </Box>
          )}
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
              handleSectionResourcesOrder={handleSectionResourcesOrder}
              sectionData={item}
              sections={items}
              setSectionsItems={setSectionsItems}
              titleText={titleText}
            />
          </Box>
        </>
      )}
    </Draggable>
  ))

  return (
    <Box>
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
