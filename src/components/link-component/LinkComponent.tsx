import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, Link } from '~/types'

import { styles } from '~/components/link-component/LinkComponent.styles'
import { spliceSx } from '~/utils/helper-functions'

interface LinkComponentProps {
  link: Link
}

const openLink = (link: Link) => {
  window.open(link.url, '_blank', 'noopener noreferrer')?.focus()
}

const LinkComponent: FC<LinkComponentProps> = ({ link }) => {
  return (
    <Box sx={styles.linkWrapper}>
      <AppButton
        onClick={() => {
          openLink(link)
        }}
        sx={styles.linkButton}
        variant={ButtonVariantEnum.Text}
      >
        <Box sx={styles.formatFrame}>
          <LinkOutlinedIcon sx={styles.linkIcon} />
        </Box>
        <Box sx={styles.linkInfo}>
          <Typography sx={spliceSx(styles.secondaryText, styles.sizeLimit)}>
            {link.name}
          </Typography>
          <Typography sx={spliceSx(styles.link, styles.sizeLimit)}>
            {link.url}
          </Typography>
        </Box>
      </AppButton>
    </Box>
  )
}

export default LinkComponent
