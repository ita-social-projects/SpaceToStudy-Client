import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import { maxElemToShow } from '~/components/sidebar-content-box/SidebarContentBox.constants'
import { spliceSx } from '~/utils/helper-functions'
import { SizeEnum, ButtonVariantEnum, Link, File } from '~/types'
import { styles } from '~/components/sidebar-content-box/SidebarContentBox.styles'

interface SidebarContentBoxProps {
  icon: ReactElement
  name: string
  content?: Link[] | File[]
}

const SidebarContentBox: FC<SidebarContentBoxProps> = ({
  icon,
  name,
  content,
  children
}) => {
  const { t } = useTranslation()

  const limitedContent =
    content && content.length > 0 ? (
      <Box sx={styles.verticalGrid}>
        {content.slice(maxElemToShow * -1).map((component) => {
          return name === t(`chatPage.sidebar.files`) ? (
            <FileComponent file={component as File} key={component._id} />
          ) : (
            <LinkComponent key={component._id} link={component} />
          )
        })}
      </Box>
    ) : (
      children
    )

  return (
    <Box sx={styles.media}>
      <Box sx={styles.headerWrapper}>
        <Box sx={styles.textWithIconWrapper}>
          {icon}
          <Typography
            sx={spliceSx(styles.textWithIconWrapper.text, styles.text)}
          >
            {name}
          </Typography>
        </Box>
        <AppButton
          size={SizeEnum.Small}
          sx={spliceSx(styles.button, styles.text)}
          variant={ButtonVariantEnum.Text}
        >
          {t(`chatPage.sidebar.seeAll`)}
        </AppButton>
      </Box>
      {limitedContent}
    </Box>
  )
}

export default SidebarContentBox
