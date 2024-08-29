import { FC, Fragment, MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

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

import {
  CourseSection,
  CourseSectionEventType,
  CourseSectionHandlers
} from '~/types'
import { useModalContext } from '~/context/modal-context'
import { setIsAddedClicked } from '~/redux/features/cooperationsSlice'

import useDroppable from '~/hooks/use-droppable'
import useMenu from '~/hooks/use-menu'
import useDndSensor from '~/hooks/use-dnd-sensor'
import { useAppDispatch } from '~/hooks/use-redux'

interface CourseSectionsListProps extends CourseSectionHandlers {
  items: CourseSection[]
  isCooperation?: boolean
}

const CourseSectionsList: FC<CourseSectionsListProps> = ({
  items,
  handleSectionInputChange,
  resourceEventHandler,
  sectionEventHandler,
  isCooperation = false
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { enabled } = useDroppable()
  const { anchorEl, openMenu, closeMenu, renderMenu } = useMenu()
  const { openModal, closeModal } = useModalContext()
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0)

  const handleSectionsSort = (sections: CourseSection[]) => {
    sectionEventHandler?.({
      type: CourseSectionEventType.SectionsOrderChange,
      sections
    })
  }

  const {
    activeItem,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors
  } = useDndSensor({ items, setItems: handleSectionsSort, idProp: 'id' })

  const handleActivitiesMenuClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setCurrentSectionIndex(index)
    openMenu(event)
  }

  const handleMenuItemClick = () => {
    closeMenu()
    sectionEventHandler?.({
      type: CourseSectionEventType.SectionAdded,
      index: currentSectionIndex
    })
  }

  const openAddCourseTemplateModal = () => {
    closeMenu()
    dispatch(setIsAddedClicked(false)) // Why is this needed?
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

  const renderActivityMenuList = addActivityMenuItems.map(
    ({ id, label, icon, onClick }) => (
      <MenuItem key={id} onClick={onClick} sx={styles.menuRoot}>
        {icon}
        {t(label)}
      </MenuItem>
    )
  )

  const renderAddActivityBtnMenu = (label: string, index: number) => (
    <Divider flexItem>
      <Typography
        data-testid='Add activity'
        onClick={(e) => handleActivitiesMenuClick(e, index)}
        sx={styles.activityButton}
      >
        {label}
        <Add sx={styles.activityButtonIcon} />
      </Typography>
      {renderMenu(renderActivityMenuList)}
    </Divider>
  )

  const cooperationActivityMenu = (index: number) => {
    return (
      <Box
        data-testid='addActivity-container'
        sx={
          anchorEl
            ? styles.activityButtonContainerVisible
            : styles.activityButtonContainerDefault
        }
      >
        {renderAddActivityBtnMenu(t('cooperationsPage.button.add'), index)}
      </Box>
    )
  }

  const renderSectionItem = (
    item: CourseSection,
    index: number,
    isDragOver = false
  ) => {
    return (
      <Fragment key={item.id}>
        {isCooperation && cooperationActivityMenu(index)}
        <SortableWrapper
          id={item.id}
          onDragEndStyles={styles.section(isDragOver)}
          onDragStartStyles={styles.section(true)}
        >
          <DragHandle
            iconStyles={styles.dragIcon}
            wrapperStyles={styles.dragIconWrapper}
          />
          <CourseSectionContainer
            handleSectionInputChange={handleSectionInputChange}
            isCooperation={isCooperation}
            resourceEventHandler={resourceEventHandler}
            sectionData={item}
            sectionEventHandler={sectionEventHandler}
          />
        </SortableWrapper>
      </Fragment>
    )
  }

  const sectionItems =
    items.length === 0
      ? renderAddActivityBtnMenu(t('cooperationsPage.button.create'), 0)
      : items.map((item, index) => renderSectionItem(item, index))

  const courseSectionContent = enabled && (
    <>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {sectionItems}
      </SortableContext>
      <DragOverlay>
        {activeItem && renderSectionItem(activeItem, 0, true)}
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
      {courseSectionContent}
    </DndContext>
  )
}

export default CourseSectionsList
