import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

import AppButton from '~/components/app-button/AppButton'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'
import SidebarGroupedContent from '~/containers/chat/sidebar-grouped-content/SidebarGroupedContent'

import {
  SizeEnum,
  ButtonVariantEnum,
  Member,
  Link,
  SidebarContentEnum
} from '~/types'
import { createUrlPath, spliceSx } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/about-chat-sidebar/AboutChatSidebar.styles'

interface AboutChatSidebarProps {
  member: Member
  links: Link[]
}

const AboutChatSidebar: FC<AboutChatSidebarProps> = ({ member, links }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { About, Links } = SidebarContentEnum
  const [titleText, setTitleText] = useState<SidebarContentEnum>(About)

  const { user, role } = member
  const { _id, firstName, lastName, photo, professionalSummary } = user
  const { path: pathToProfile } = authRoutes.userProfile

  const navigateToUserProfile = () => {
    navigate(createUrlPath(pathToProfile, _id, { role }))
  }

  const onSeeAllClick = (text: SidebarContentEnum) => {
    setTitleText(text)
  }

  const goBackBtn = titleText !== About && (
    <IconButton onClick={() => setTitleText(About)} sx={styles.goBackBtn}>
      <ArrowBackIcon sx={styles.goBackIcon} />
    </IconButton>
  )

  return (
    <Box data-testid='sidebar' sx={styles.wrapper}>
      <Box sx={styles.header}>
        {goBackBtn}
        <Typography sx={spliceSx(styles.headerText, styles.title)}>
          {t(`chatPage.sidebar.${titleText}`)}
        </Typography>
      </Box>
      <Divider />
      <SimpleBar style={styles.scrollBar}>
        {titleText === About ? (
          <Box sx={styles.contentWrapper}>
            <Box sx={styles.chatInfo}>
              <AvatarIcon
                firstName={firstName}
                lastName={lastName}
                photo={
                  photo &&
                  createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
                }
                sx={styles.userAvatar}
              />
              <Typography
                sx={styles.title}
              >{`${firstName} ${lastName}`}</Typography>
              <AppButton
                onClick={navigateToUserProfile}
                size={SizeEnum.Medium}
                sx={styles.secondaryText}
                variant={ButtonVariantEnum.Tonal}
              >
                {t(`chatPage.sidebar.viewButton`)}
              </AppButton>
              <Typography sx={styles.userDescription}>
                {professionalSummary || t(`chatPage.sidebar.noSummary`)}
              </Typography>
            </Box>
            <Divider />
            <SidebarContentBox
              content={links}
              icon={<LinkOutlinedIcon />}
              name={Links}
              onClick={onSeeAllClick}
            />
          </Box>
        ) : (
          <SidebarGroupedContent<Link> items={links} />
        )}
      </SimpleBar>
    </Box>
  )
}

export default AboutChatSidebar
