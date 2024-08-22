import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
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
  File,
  Media,
  SidebarContentEnum
} from '~/types'
import { createUrlPath, spliceSx } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/about-chat-sidebar/AboutChatSidebar.styles'

interface AboutChatSidebarProps {
  member: Member
  media: Media[]
  files: File[]
  links: Link[]
}

const AboutChatSidebar: FC<AboutChatSidebarProps> = ({
  member,
  media,
  files,
  links
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { About, Media, Files, Links } = SidebarContentEnum
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

  const getContentByTitle = () => {
    switch (titleText) {
      case Files:
        return <SidebarGroupedContent<File> items={files} type={titleText} />
      case Media:
        return <SidebarGroupedContent<Media> items={media} type={titleText} />
      case Links:
        return <SidebarGroupedContent<Link> items={links} type={titleText} />
    }
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
              content={media}
              icon={<ImageOutlinedIcon />}
              name={Media}
              onClick={onSeeAllClick}
            />
            <Divider />
            <SidebarContentBox
              content={files}
              icon={<InsertDriveFileOutlinedIcon />}
              name={Files}
              onClick={onSeeAllClick}
            />
            <Divider />
            <SidebarContentBox
              content={links}
              icon={<LinkOutlinedIcon />}
              name={Links}
              onClick={onSeeAllClick}
            />
          </Box>
        ) : (
          getContentByTitle()
        )}
      </SimpleBar>
    </Box>
  )
}

export default AboutChatSidebar
