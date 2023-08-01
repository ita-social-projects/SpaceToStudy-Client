import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AllContentModal from '~/components/all-content-modal/AllContentModal'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import { useModalContext } from '~/context/modal-context'
import { spliceSx } from '~/utils/helper-functions'
import { SizeEnum, ButtonVariantEnum, Link, File } from '~/types'

import { styles } from '~/components/sidebar-content-box/SidebarContentBox.styles'

interface SidebarContentBoxProps {
  Icon: React.ComponentType
  name: string
  content?: Link[] | File[]
}

type SidebarImageGridModifications = {
  compactMode: boolean
}

const SidebarContentBox: FC<SidebarContentBoxProps> = ({
  Icon,
  name,
  content,
  children
}) => {
  const maxElemToShow = 3

  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const seeAll = () => {
    const childrenCopy = React.Children.map(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as React.FunctionComponent).name === 'SidebarImageGrid'
      ) {
        return React.cloneElement(child, {
          compactMode: false
        } as SidebarImageGridModifications)
      }
      return child
    })

    openModal({
      component: (
        <AllContentModal
          Icon={Icon}
          title={`${t(`chat.sidebar.modal.all`)} ${name}`}
        >
          {childrenCopy}
        </AllContentModal>
      )
    })
  }

  const limitedContent =
    content && content.length > 0 ? (
      <Box sx={styles.verticalGrid}>
        {content
          .slice(content.length > 3 ? maxElemToShow : 0)
          .reverse()
          .map((component) => {
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
