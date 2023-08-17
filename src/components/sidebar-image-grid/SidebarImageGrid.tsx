import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import ClickableImage from '~/components/clickable-image/ClickableImage'
import AllContentModal from '~/components/all-content-modal/AllContentModal'

import { useModalContext } from '~/context/modal-context'
import { maxElemToShow } from '~/components/sidebar-content-box/SidebarContentBox.constants'
import { Media } from '~/types'
import { styles } from '~/components/sidebar-image-grid/SidebarImageGrid.styles'

interface SidebarImageGridProps {
  images: Media[]
  compactMode?: boolean
}

const SidebarImageGrid: FC<SidebarImageGridProps> = ({
  images,
  compactMode = true
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const mediaSize = useMemo(() => images.length, [images])

  const showImage = (image: Media) => {
    openModal({
      component: (
        <AllContentModal
          icon={<ImageOutlinedIcon />}
          title={image.name ?? t(`chatPage.sidebar.unknownName`)}
        >
          <Box sx={styles.imageWrapper}>
            <Box component='img' src={image.path} sx={styles.modalImage} />
          </Box>
        </AllContentModal>
      )
    })
  }

  const compactGrid = images.slice(maxElemToShow * -1).map((image, index) => (
    <ClickableImage image={image} key={image._id} onClick={showImage}>
      {index === 2 && <Box>+{mediaSize - 2}</Box>}
    </ClickableImage>
  ))

  const expansiveGrid = images.map((image) => (
    <ClickableImage image={image} key={image._id} onClick={showImage} />
  ))

  return (
    <Box sx={compactMode ? styles.imageGrid : styles.expansiveGrid}>
      {compactMode ? compactGrid : expansiveGrid}
    </Box>
  )
}

export default SidebarImageGrid
