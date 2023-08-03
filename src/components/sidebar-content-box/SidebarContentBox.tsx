import React, { FC, isValidElement, cloneElement, Children } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AllContentModal from '~/components/all-content-modal/AllContentModal'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'
import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'

import { maxElemToShow } from '~/components/sidebar-content-box/SidebarContentBox.constants'
import { useModalContext } from '~/context/modal-context'
import { spliceSx } from '~/utils/helper-functions'
import { SizeEnum, ButtonVariantEnum, Link, File } from '~/types'
import { styles } from '~/components/sidebar-content-box/SidebarContentBox.styles'

interface SidebarContentBoxProps {
  icon: React.ComponentType
  name: string
  content?: Link[] | File[]
}

type ModifiedChildren = {
  compactMode: boolean
}

const SidebarContentBox: FC<SidebarContentBoxProps> = ({
  icon: Icon,
  name,
  content,
  children
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const seeAll = () => {
    const updatedChildren = Children.map(children, (child) => {
      if (isValidElement(child) && child.type === SidebarImageGrid) {
        return cloneElement(child, { compactMode: false } as ModifiedChildren)
      }
      return child
    })

    openModal({
      component: (
        <AllContentModal
          icon={<Icon />}
          title={`${t('chat.sidebar.modal.all')} ${name}`}
        >
          {updatedChildren}
        </AllContentModal>
      )
    })
  }

  const limitedContent =
    content && content.length > 0 ? (
      <Box sx={styles.verticalGrid}>
        {content.slice(maxElemToShow * -1).map((component) => {
          return name === t(`chat.sidebar.files`) ? (
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
          <Icon />
          <Typography
            sx={spliceSx(styles.textWithIconWrapper.text, styles.text)}
          >
            {name}
          </Typography>
        </Box>
        <AppButton
          onClick={seeAll}
          size={SizeEnum.Small}
          sx={spliceSx(styles.button, styles.text)}
          variant={ButtonVariantEnum.Text}
        >
          {t(`chat.sidebar.seeAll`)}
        </AppButton>
      </Box>
      {limitedContent}
    </Box>
  )
}

export default SidebarContentBox
