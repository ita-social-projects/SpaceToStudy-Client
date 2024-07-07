import { FC, Fragment, MouseEvent } from 'react'
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
import { v4 as uuidv4 } from 'uuid'

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
import {
  cooperationsSelector,
  setCurrentSectionIndex,
  setIsAddedClicked
} from '~/redux/features/cooperationsSlice'

import useDroppable from '~/hooks/use-droppable'
import useMenu from '~/hooks/use-menu'
import useDndSensor from '~/hooks/use-dnd-sensor'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

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
  const { enabled } = useDroppable()
  const Id = uuidv4()

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

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { anchorEl, openMenu, closeMenu, renderMenu } = useMenu()
  const { openModal, closeModal } = useModalContext()
  const { currentSectionIndex } = useAppSelector(cooperationsSelector)

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
    sectionEventHandler?.({
      type: CourseSectionEventType.SectionAdded,
      index: currentSectionIndex
    })
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
      <MenuItem key={id} onClick={onClick} sx={styles.menuRoot}>
        {icon}
        {t(label)}
      </MenuItem>
    )
  )

  const addActivityMenu = isCooperation && (
    <Divider flexItem>
      <Typography
        data-testid='Add activity'
        onClick={handleActivitiesMenuClick}
        sx={styles.activityButton}
      >
        {t(`cooperationsPage.button.create`)}
        <Add sx={styles.activityButtonIcon} />
      </Typography>
      {renderMenu(addActivityMenuList)}
    </Divider>
  )

  const sectionItemMapper = (item: CourseSection, isDragOver = false) => {
    const cooperationMenu = isCooperation && (
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
            data-testid='Add activity'
            id={Id}
            onClick={handleActivitiesMenuClick}
            sx={styles.activityButton}
          >
            {t(`cooperationsPage.button.add`)}
            <Add sx={styles.activityButtonIcon} />
          </Typography>
          {renderMenu(addActivityMenuList)}
        </Divider>
      </Box>
    )

    return (
      <Fragment key={item.id}>
        {cooperationMenu}
        <SortableWrapper
          id={Id}
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
      ? addActivityMenu
      : items.map((item) => sectionItemMapper(item))

  const courseSectionContent = enabled && (
    <>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {sectionItems}
      </SortableContext>
      <DragOverlay>
        {activeItem && sectionItemMapper(activeItem, true)}
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
