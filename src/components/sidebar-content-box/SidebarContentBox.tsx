import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import { maxElemToShow } from '~/components/sidebar-content-box/SidebarContentBox.constants'
import { spliceSx } from '~/utils/helper-functions'
import {
  SizeEnum,
  ButtonVariantEnum,
  Link,
  File,
  Media,
  SidebarContentEnum
} from '~/types'
import { styles } from '~/components/sidebar-content-box/SidebarContentBox.styles'

interface SidebarContentBoxProps {
  icon: ReactElement
  name: SidebarContentEnum
  content: Link[] | File[] | Media[]
  onClick: (text: SidebarContentEnum) => void
}

const SidebarContentBox: FC<SidebarContentBoxProps> = ({
  icon,
  name,
  content = [],
  onClick
}) => {
  const { t } = useTranslation()

  const { Media, Files } = SidebarContentEnum
  const isMoreContent = content.length > maxElemToShow && name !== Media
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

  const mediaContent = name === Media && (
    <SidebarImageGrid
      images={content as Media[]}
      onClick={() => onClick(name)}
    />
  )

  const limitedContent = content.slice(0, maxElemToShow).map((component) => {
    return name === Files ? (
      <FileComponent file={component as File} key={component._id} />
    ) : (
      <LinkComponent key={component._id} link={component as Link} />
    )
  })

  const noContent = !content.length && (
    <Typography sx={styles.noContent}>
      {t(`chatPage.sidebar.no${capitalizedName}`)}
    </Typography>
  )

  return (
    <Box>
      <Box sx={styles.headerWrapper}>
        <Box sx={styles.textWithIconWrapper}>
          {icon}
          <Typography
            sx={spliceSx(styles.textWithIconWrapper.text, styles.text)}
          >
            {t(`chatPage.sidebar.${name}`)}
          </Typography>
        </Box>
        {isMoreContent && (
          <AppButton
            onClick={() => onClick(name)}
            size={SizeEnum.Small}
            sx={spliceSx(styles.button, styles.text)}
            variant={ButtonVariantEnum.Text}
          >
            {t(`chatPage.sidebar.seeAll`)}
          </AppButton>
        )}
      </Box>
      {name === Media ? mediaContent : limitedContent}
      {noContent}
    </Box>
  )
}

export default SidebarContentBox
