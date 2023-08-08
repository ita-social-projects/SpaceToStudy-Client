import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, Link } from '~/types'
import { openInNewTab } from '~/components/file-component/FileComponent.constants'
import { styles } from '~/components/link-component/LinkComponent.styles'

interface LinkComponentProps {
  link: Link
}

const LinkComponent: FC<LinkComponentProps> = ({ link }) => {
  return (
    <Box sx={styles.linkWrapper}>
      <AppButton
        onClick={() => openInNewTab(link)}
        sx={styles.linkButton}
        variant={ButtonVariantEnum.Text}
      >
        <Box sx={styles.formatFrame}>
          <LinkOutlinedIcon sx={styles.linkIcon} />
        </Box>
        <Box sx={styles.linkInfo}>
          <Typography sx={styles.secondaryText}>{link.name}</Typography>
          <Typography sx={styles.link}>{link.url}</Typography>
        </Box>
      </AppButton>
    </Box>
  )
}

export default LinkComponent
