import { FC, MouseEvent } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Crop75Icon from '@mui/icons-material/Crop75'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import { Add } from '@mui/icons-material'

import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'
import DragHandle from '~/components/drag-handle/DragHandle'
import { styles } from '~/containers/course-sections-list/CourseSectionsList.styles'

import useDroppable from '~/hooks/use-droppable'
import useMenu from '~/hooks/use-menu'
import useDndSensor from '~/hooks/use-dnd-sensor'
import { CourseSection, CourseSectionHandlers } from '~/types'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import {
  cooperationsSelector,
  setCurrentSectionIndex,
  setIsAddedClicked
} from '~/redux/features/cooperationsSlice'

interface CourseSectionsListProps extends CourseSectionHandlers {
  items: CourseSection[]
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

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({ items, setItems: setSectionsItems, idProp: 'id' })

  const { anchorEl, openMenu, closeMenu, renderMenu } = useMenu()

  const { openModal, closeModal } = useModalContext()
  const { currentSectionIndex } = useAppSelector(cooperationsSelector)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleActivitiesMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    openMenu(event)
    dispatch(
      setCurrentSectionIndex(
        items.findIndex((item) => item.id === event.currentTarget.id)
      )
    )
  }

  const handleMenuItemClick = () => {
    closeMenu()
    addNewSection?.(currentSectionIndex)
  }

  const openAddCourseTemplateModal = () => {
    closeMenu()
    dispatch(setIsAddedClicked(false))
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

  const sectionsItem = (item: CourseSection, isDragOver = false) => {
    const coorperationMenu = isCooperation && (
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
    )

    return (
      <>
        {coorperationMenu}
        <SortableWrapper
          id={item.id}
          key={item.id}
          onDragEndStyles={styles.section(isDragOver)}
          onDragStartStyles={styles.section(true)}
        >
          <DragHandle
            iconStyles={styles.dragIcon}
            wrapperStyles={styles.dragIconWrapper}
          />
          <CourseSectionContainer
            handleSectionInputChange={handleSectionInputChange}
            handleSectionNonInputChange={handleSectionNonInputChange}
            handleSectionResourcesOrder={handleSectionResourcesOrder}
            sectionData={item}
            sections={items}
            setSectionsItems={setSectionsItems}
            titleText={titleText}
          />
        </SortableWrapper>
      </>
    )
  }
  const sectionItems = items.map((item) => sectionsItem(item))

  const courseSectionContent = enabled && (
    <>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {sectionItems}
      </SortableContext>
      <DragOverlay>{activeItem && sectionsItem(activeItem, true)}</DragOverlay>
    </>
  )
  return (
    <DndContext
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      {courseSectionContent}
    </DndContext>
  )
}

export default CourseSectionsList
