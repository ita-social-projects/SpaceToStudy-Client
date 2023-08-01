import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

import IconButton from '@mui/material/IconButton'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import Close from '@mui/icons-material/Close'

import AppButton from '~/components/app-button/AppButton'
import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'
import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import { SizeEnum, ButtonVariantEnum, UserResponse, Link, File } from '~/types'
import { createUrlPath, spliceSx } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/components/about-chat-sidebar/AboutChatSidebar.styles'

interface AboutChatSidebarProps {
  user: UserResponse
  media: Array<string>
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

  const userProfileURL = createUrlPath(authRoutes.userProfile.path, _id, {
    role
  })

  const closeSidebar = () => {
    setIsOpened(false)
  }

  return (
    <Box
      data-testid='sidebar'
      style={isOpened ? undefined : { display: 'none' }}
      sx={styles.wrapper}
    >
      <Box sx={styles.header}>
        <Typography sx={spliceSx(styles.header.text, styles.title)}>
          {t(`chat.sidebar.about`)}
        </Typography>
        <IconButton
          aria-label='close'
          onClick={closeSidebar}
          sx={styles.header.iconButton}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={styles.chatInfo}>
        <Avatar src={photo} sx={styles.chatInfo.avatar} />
        <Typography sx={styles.title}>{`${firstName} ${lastName}`}</Typography>
        <AppButton
          onClick={() => navigate(userProfileURL)}
          size={SizeEnum.Medium}
          sx={styles.secondaryText}
          variant={ButtonVariantEnum.Tonal}
        >
          View Profile
        </AppButton>
        <Typography sx={styles.chatInfo.description}>
          {userDescription || t(`chat.sidebar.noSummary`)}
        </Typography>
      </Box>
      <Divider />
      <SidebarContentBox Icon={ImageOutlinedIcon} name={'Media'}>
        {media.length !== 0 ? (
          <SidebarImageGrid images={media} />
        ) : (
          <Typography sx={styles.notFound}>
            {t(`chat.sidebar.noMedia`)}
          </Typography>
        )}
      </SidebarContentBox>
      <Divider />
      <SidebarContentBox
        Icon={InsertDriveFileOutlinedIcon}
        content={files}
        name={'Files'}
      >
        <Box sx={styles.verticalGrid}>
          {files.length !== 0 ? (
            files
              .slice()
              .reverse()
              .map((file) => <FileComponent file={file} key={file._id} />)
          ) : (
            <Typography sx={styles.notFound}>
              {t(`chat.sidebar.noFiles`)}
            </Typography>
          )}
        </Box>
      </SidebarContentBox>
      <Divider />
      <SidebarContentBox Icon={LinkOutlinedIcon} content={links} name={'Links'}>
        <Box sx={styles.verticalGrid}>
          {links.length !== 0 ? (
            links
              .slice()
              .reverse()
              .map((link) => <LinkComponent key={link._id} link={link} />)
          ) : (
            <Typography sx={styles.notFound}>
              {t(`chat.sidebar.noLinks`)}
            </Typography>
          )}
        </Box>
      </SidebarContentBox>
    </Box>
  )
}

export default AboutChatSidebar
