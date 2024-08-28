import { useState, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import AddIcon from '@mui/icons-material/Add'
import Crop75Icon from '@mui/icons-material/Crop75'

import { useModalContext } from '~/context/modal-context'
import useMenu from '~/hooks/use-menu'
import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import AppButton from '~/components/app-button/AppButton'

import { SizeEnum, ButtonVariantEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import {
  setIsActivityCreated,
  setIsNewActivity
} from '~/redux/features/cooperationsSlice'

const EmptyCooperationTutorControls: FC = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const dispatch = useAppDispatch()
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

  const MenuIcon = isMenuOpen ? (
    <KeyboardArrowUpIcon />
  ) : (
    <KeyboardArrowDownIcon />
  )

  const handleFromScratch = () => {
    closeMenu()
    dispatch(setIsActivityCreated(true)) // should delete it
    dispatch(setIsNewActivity(true)) // should delete it
  }

  const menuItems = [
    {
      label: 'courseTemplate',
      icon: <ViewComfyOutlinedIcon />,
      onClick: openAddCourseTemplateModal
    },
    {
      label: 'scratch',
      icon: <Crop75Icon />,
      onClick: handleFromScratch
    }
  ]

  const menu = menuItems.map(({ label, icon, onClick }) => (
    <MenuItem key={label} onClick={onClick} sx={styles.menuItem}>
      {icon} {t(`cooperationsPage.manyTypes.${label}`)}
    </MenuItem>
  ))

  const StartIcon = <AddIcon fontSize={SizeEnum.Small} />

  const MenuDropdown = renderMenu(menu)
  return (
    <>
      <AppButton
        endIcon={MenuIcon}
        onClick={handleMenuClick()}
        size={SizeEnum.Large}
        startIcon={StartIcon}
        sx={styles.button}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('cooperationsPage.button.create')}
      </AppButton>
      {MenuDropdown}
    </>
  )
}

export default EmptyCooperationTutorControls
