import { FC, MouseEvent, useCallback, useMemo, useState } from 'react'
import {
  DndContext,
  Active,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  DragEndEvent,
  TouchSensor
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Crop75Icon from '@mui/icons-material/Crop75'
import { Divider, MenuItem, Typography } from '@mui/material'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import { Add } from '@mui/icons-material'

import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import SortableWrapper from '~/containers/sortable-wrapper/SortableWrapper'
import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'
import DragHandle from '~/components/drag-handle/DragHandle'
import { styles } from '~/containers/course-sections-list/CourseSectionsList.styles'

import { useCooperationContext } from '~/context/cooperation-context'
import { useModalContext } from '~/context/modal-context'
import useDroppable from '~/hooks/use-droppable'
import useMenu from '~/hooks/use-menu'
import { CourseSection, CourseSectionHandlers } from '~/types'

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
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  )

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (active && over) {
        const activeIndex = items.findIndex((item) => item.id === active.id)
        const overIndex = items.findIndex((item) => item.id === over.id)
        if (activeIndex !== -1 && overIndex !== -1) {
          setSectionsItems(arrayMove(items, activeIndex, overIndex))
        }
      }
    },
    [setSectionsItems, items]
  )
  const { openMenu, closeMenu, renderMenu } = useMenu()

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

  const sectionsItem = (item: CourseSection, isDragOver = false) => {
    return (
      <SortableWrapper
        id={item.id}
        key={item.id}
        onDragEndStyles={styles.section(isDragOver)}
        onDragStartStyles={styles.section(true)}
      >
        {isCooperation && (
          <Box data-testid='addActivity-container'>
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
    )
  }
  const sectionItems = items.map((item) => sectionsItem(item))
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
      {enabled && (
        <>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {sectionItems}
          </SortableContext>
          <DragOverlay>
            {activeItem && sectionsItem(activeItem, true)}
          </DragOverlay>
        </>
      )}
    </DndContext>
  )
}

export default CourseSectionsList
