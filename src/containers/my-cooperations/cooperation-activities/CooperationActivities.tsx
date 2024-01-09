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

import { SizeEnum, ButtonVariantEnum, ComponentEnum } from '~/types'
import defaultImg from '~/assets/img/cooperation-details/default.svg'

import { styles } from '~/containers/my-cooperations/cooperation-activities/CooperationActivities.styles'

const CooperationActivities = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const handleMenuClick = () => (event: MouseEvent<HTMLButtonElement>) => {
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

  const createDescriptionSpan = (text: string) => (
    <Typography component={ComponentEnum.Span} sx={styles.weightBox}>
      {t(`cooperationsPage.description.${text}`)}
    </Typography>
  )

  const componentDescription = (
    <Typography>
      {t('cooperationsPage.description.existingCourse')}
      {createDescriptionSpan('courseTemplate')}
      {t('cooperationsPage.description.resourceLibrary')}
      {createDescriptionSpan('module')}
      {t('cooperationsPage.description.fillThis')}
      {createDescriptionSpan('lessons')}
      {t('cooperationsPage.description.or')}
      {createDescriptionSpan('quizzes')}
      {t('cooperationsPage.description.resourcesLibrary')}
    </Typography>
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

export default CooperationActivities
