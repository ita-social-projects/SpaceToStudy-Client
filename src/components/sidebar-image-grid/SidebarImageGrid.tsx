import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import ClickableImage from '~/components/clickable-image/ClickableImage'
import AllContentModal from '~/components/all-content-modal/AllContentModal'

import { useModalContext } from '~/context/modal-context'
import { styles } from '~/components/sidebar-image-grid/SidebarImageGrid.styles'

interface SidebarImageGridProps {
  images: Array<string>
  compactMode?: boolean
}

const SidebarImageGrid: FC<SidebarImageGridProps> = ({
  images,
  compactMode = true
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const mediaSize = useMemo(() => images.length, [images])

  const getImageName = (image: string) => {
    const pathParts = image.split('/')
    const imageFileName = pathParts[pathParts.length - 1]

    return imageFileName
  }

  const showImage = (image: string) => {
    openModal({
      component: (
        <AllContentModal
          icon={<ImageOutlinedIcon />}
          title={getImageName(image) ?? t(`chat.sidebar.unknownName`)}
        >
          <Box sx={styles.imageWrapper}>
            <Box component='img' src={image} sx={styles.modalImage} />
          </Box>
        </AllContentModal>
      )
    })
  }

  const compactGrid = images.slice(-3).map((image, index) => (
    <ClickableImage image={image} key={index} onUserClick={showImage}>
      {index === 2 && <Box>+{mediaSize - 2}</Box>}
    </ClickableImage>
  ))

  const expansiveGrid = images.map((image) => (
    <ClickableImage image={image} key={image} onUserClick={showImage} />
  ))

  return (
    <Box sx={compactMode ? styles.imageGrid : styles.modalImageGrid}>
      {mediaSize > 3 && compactMode ? compactGrid : expansiveGrid}
    </Box>
  )
}

export default SidebarImageGrid
