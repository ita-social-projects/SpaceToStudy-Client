import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import { Close as CloseIcon } from '@mui/icons-material'

import AppButton from '~/components/app-button/AppButton'
import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'
import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import {
  SizeEnum,
  ButtonVariantEnum,
  UserResponse,
  Link,
  File,
  Media
} from '~/types'
import { createUrlPath, spliceSx } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/containers/about-chat-sidebar/AboutChatSidebar.styles'

interface AboutChatSidebarProps {
  user: UserResponse
  media: Media[]
  files: File[]
  links: Link[]
}

const AboutChatSidebar: FC<AboutChatSidebarProps> = ({
  user,
  media,
  files,
  links
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isOpened, setIsOpened] = useState(true)

  const {
    _id,
    firstName,
    lastName,
    photo,
    role,
    professionalSummary: userDescription
  } = user

  const mediaContent =
    media.length !== 0 ? (
      <SidebarImageGrid images={media} />
    ) : (
      <Typography sx={styles.notFound}>{t(`chat.sidebar.noMedia`)}</Typography>
    )

  const filesContent =
    files.length !== 0 ? (
      files.map((file) => <FileComponent file={file} key={file._id} />)
    ) : (
      <Typography sx={styles.notFound}>{t(`chat.sidebar.noFiles`)}</Typography>
    )

  const linksContent =
    links.length !== 0 ? (
      links.map((link) => <LinkComponent key={link._id} link={link} />)
    ) : (
      <Typography sx={styles.notFound}>{t(`chat.sidebar.noLinks`)}</Typography>
    )

  const navigateToUserProfile = () => {
    navigate(
      createUrlPath(authRoutes.userProfile.path, _id, {
        role
      })
    )
  }

  const closeSidebar = () => {
    setIsOpened(false)
  }

  return (
    <Box data-testid='sidebar' sx={styles.wrapper(isOpened)}>
      <Box sx={styles.header}>
        <Typography sx={spliceSx(styles.headerText, styles.title)}>
          {t(`chat.sidebar.about`)}
        </Typography>
        <IconButton
          aria-label='close'
          onClick={closeSidebar}
          sx={styles.headerIcon}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <SimpleBar style={styles.scrollBar}>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.chatInfo}>
            <Avatar src={photo} sx={styles.userAvatar} />
            <Typography
              sx={styles.title}
            >{`${firstName} ${lastName}`}</Typography>
            <AppButton
              onClick={navigateToUserProfile}
              size={SizeEnum.Medium}
              sx={styles.secondaryText}
              variant={ButtonVariantEnum.Tonal}
            >
              {t(`chat.sidebar.viewButton`)}
            </AppButton>
            <Typography sx={styles.userDescription}>
              {userDescription ?? t(`chat.sidebar.noSummary`)}
            </Typography>
          </Box>
          <Divider />
          <SidebarContentBox
            icon={<ImageOutlinedIcon />}
            name={t('chat.sidebar.media')}
          >
            {mediaContent}
          </SidebarContentBox>
          <Divider />
          <SidebarContentBox
            content={files}
            icon={<InsertDriveFileOutlinedIcon />}
            name={t('chat.sidebar.files')}
          >
            <Box sx={styles.verticalGrid}>{filesContent}</Box>
          </SidebarContentBox>
          <Divider />
          <SidebarContentBox
            content={links}
            icon={<LinkOutlinedIcon />}
            name={t('chat.sidebar.links')}
          >
            <Box sx={styles.verticalGrid}>{linksContent}</Box>
          </SidebarContentBox>
        </Box>
      </SimpleBar>
    </Box>
  )
}

export default AboutChatSidebar
