import { useState, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import AddIcon from '@mui/icons-material/Add'
import Crop75Icon from '@mui/icons-material/Crop75'

import { useModalContext } from '~/context/modal-context'
import { useCooperationContext } from '~/context/cooperation-context'
import useMenu from '~/hooks/use-menu'
import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import AppButton from '~/components/app-button/AppButton'

import { SizeEnum, ButtonVariantEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities.styles'

const EmptyCooperationTutorControls: FC = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { setIsActivityCreated } = useCooperationContext()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleMenuClick = () => (event: MouseEvent<HTMLButtonElement>) => {
    openMenu(event)
    setIsMenuOpen((prevState) => !prevState)
  }

  const openAddCourseTemplateModal = () => {
    closeMenu()
    openModal({
      component: <AddCourseTemplateModal closeModal={closeModal} />
    })
  }

  const menuIcon = isMenuOpen ? (
    <KeyboardArrowUpIcon />
  ) : (
    <KeyboardArrowDownIcon />
  )

  const handleFromScratch = () => {
    closeMenu()
    setIsActivityCreated(true)
  }

  const menuItems = [
    {
      id: 1,
      label: <>{t('cooperationsPage.manyTypes.courseTemplate')}</>,
      icon: <ViewComfyOutlinedIcon />,
      onClick: openAddCourseTemplateModal
    },
    {
      id: 2,
      label: <>{t('cooperationsPage.manyTypes.scratch')}</>,
      icon: <Crop75Icon />,
      onClick: handleFromScratch
    }
  ]

  const menu = menuItems.map(({ id, label, icon, onClick }) => (
    <MenuItem key={id} onClick={onClick} sx={styles.menuItem}>
      {icon} {label}
    </MenuItem>
  ))

  const startIcon = <AddIcon fontSize={SizeEnum.Small} />

  const menuCondition = renderMenu(menu)
  return (
    <>
      <AppButton
        endIcon={menuIcon}
        onClick={handleMenuClick()}
        size={SizeEnum.Large}
        startIcon={startIcon}
        sx={styles.button}
        variant={ButtonVariantEnum.Contained}
      >
        {t('cooperationsPage.button.create')}
      </AppButton>
      {menuCondition}
    </>
  )
}

export default EmptyCooperationTutorControls
