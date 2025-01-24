import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

import Button from '~scss-components/button/Button'

import { Link } from '~/types'
import { openInNewTab } from '~/components/file-component/FileComponent.constants'
import { styles } from '~/components/link-component/LinkComponent.styles'

interface LinkComponentProps {
  link: Link
}

const LinkComponent: FC<LinkComponentProps> = ({ link }) => {
  return (
    <Button
      onClick={() => openInNewTab(link)}
      sx={styles.linkButton}
      variant='text-primary'
    >
      <Box sx={styles.linkWrapper}>
        <Box sx={styles.formatFrame}>
          <LinkOutlinedIcon sx={styles.linkIcon} />
        </Box>
        <Box sx={styles.linkInfo}>
          <Typography sx={styles.secondaryText}>{link.name}</Typography>
          <Typography sx={styles.link}>{link.url}</Typography>
        </Box>
      </Box>
    </Button>
  )
}

export default LinkComponent
