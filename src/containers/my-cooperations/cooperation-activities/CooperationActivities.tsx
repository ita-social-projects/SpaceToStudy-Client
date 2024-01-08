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

import useMenu from '~/hooks/use-menu'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import { menuTypes } from '~/containers/my-cooperations/cooperation-activities/CooperationActivities.constants'

import { SizeEnum, ButtonVariantEnum } from '~/types'
import defaultImg from '~/assets/img/cooperation-details/default.svg'

import { styles } from '~/containers/my-cooperations/cooperation-activities/CooperationActivities.styles'

const CooperationActivities = () => {
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const handleMenuClick =
    (menuType: string) => (event: MouseEvent<HTMLButtonElement>) => {
      setActiveMenu(menuType)
      openMenu(event)
      setIsMenuOpen((prevState) => !prevState)
    }

  const menuIcon = isMenuOpen ? (
    <KeyboardArrowUpIcon />
  ) : (
    <KeyboardArrowDownIcon />
  )

  const onCloseMenu = () => {
    closeMenu()
  }

  const menuItems = [
    {
      id: 1,
      label: <>{t('cooperationsPage.menyTypes.courseTemplate')}</>,
      icon: <ViewComfyOutlinedIcon />
    },
    {
      id: 2,
      label: <>{t('cooperationsPage.menyTypes.scratch')}</>,
      icon: <Crop75Icon />
    }
  ]

  const menu = menuItems.map(({ id, label, icon }) => (
    <MenuItem key={id} onClick={onCloseMenu} sx={styles.menuItem}>
      {icon} {label}
    </MenuItem>
  ))

  const componentDescription = (
    <Typography>
      {t('cooperationsPage.description.existingCourse')}
      <Typography component='span' sx={styles.weightBox}>
        {t('cooperationsPage.description.courseTemplate')}
      </Typography>
      {t('cooperationsPage.description.resourceLibrary')}
      <Typography component='span' sx={styles.weightBox}>
        {t('cooperationsPage.description.module')}
      </Typography>
      {t('cooperationsPage.description.fillThis')}
      <Typography component='span' sx={styles.weightBox}>
        {t('cooperationsPage.description.lessons')}
      </Typography>
      {t('cooperationsPage.description.or')}
      <Typography component='span' sx={styles.weightBox}>
        {t('cooperationsPage.description.quizzes')}
      </Typography>
      {t('cooperationsPage.description.resourcesLibrary')}
    </Typography>
  )

  const startIcon = <AddIcon fontSize={SizeEnum.Small} />

  const menuCondition =
    activeMenu === menuTypes.courseTemplate && renderMenu(menu)

  return (
    <Box sx={styles.logoBlock}>
      <ImgTitleDescription
        description={componentDescription}
        img={defaultImg}
        style={styles}
      />
      <AppButton
        endIcon={menuIcon}
        onClick={handleMenuClick(menuTypes.courseTemplate)}
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

export default CooperationActivities
