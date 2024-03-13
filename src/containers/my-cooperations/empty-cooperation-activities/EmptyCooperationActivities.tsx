import { useState, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'
import AddIcon from '@mui/icons-material/Add'
import Crop75Icon from '@mui/icons-material/Crop75'

import { useModalContext } from '~/context/modal-context'
import { useCooperationContext } from '~/context/cooperation-context'
import useMenu from '~/hooks/use-menu'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import AppButton from '~/components/app-button/AppButton'

import { SizeEnum, ButtonVariantEnum, ComponentEnum } from '~/types'
import defaultImg from '~/assets/img/cooperation-details/default.svg'
import { styles } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities.styles'

const EmptyCooperationActivities = () => {
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

  const createDescriptionSpan = (text: string) => (
    <Typography component={ComponentEnum.Span} sx={styles.weightBox}>
      {t(`cooperationsPage.description.${text}`)}
    </Typography>
  )

  const componentDescription = (
    <>
      {t('cooperationsPage.description.existingCourse')}
      {createDescriptionSpan('courseTemplate')}
      {t('cooperationsPage.description.resourceLibrary')}
      {createDescriptionSpan('module')}
      {t('cooperationsPage.description.fillThis')}
      {createDescriptionSpan('lessons')}
      {t('cooperationsPage.description.or')}
      {createDescriptionSpan('quizzes')}
      {t('cooperationsPage.description.resourcesLibrary')}
    </>
  )

  const startIcon = <AddIcon fontSize={SizeEnum.Small} />

  const menuCondition = renderMenu(menu)

  return (
    <Box sx={styles.logoBlock}>
      <ImgTitleDescription
        description={componentDescription}
        img={defaultImg}
        style={styles}
      />
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
    </Box>
  )
}

export default EmptyCooperationActivities
