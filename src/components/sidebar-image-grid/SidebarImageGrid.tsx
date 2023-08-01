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

  const showImage = (image: string) => {
    openModal({
      component: (
        <AllContentModal
          Icon={ImageOutlinedIcon}
          title={
            image?.split('/')?.pop()?.split('.')[0] ||
            t(`chat.sidebar.unknownName`)
          }
        >
          <Box sx={styles.imageWrapper}>
            <Box component='img' src={image} sx={styles.modalImage} />
          </Box>
        </AllContentModal>
      )
    })
  }

  return (
    <Box sx={compactMode ? styles.imageGrid : styles.modalImageGrid}>
      {mediaSize > 3 && compactMode ? (
        <>
          <ClickableImage
            clickFunction={showImage}
            image={images[mediaSize - 1]}
          />
          <ClickableImage
            clickFunction={showImage}
            image={images[mediaSize - 2]}
          />
          <ClickableImage
            clickFunction={showImage}
            image={images[mediaSize - 3]}
          >
            <Box>+{mediaSize - 2}</Box>
          </ClickableImage>
        </>
      ) : (
        images
          .slice()
          .reverse()
          .map((image) => (
            <ClickableImage
              clickFunction={showImage}
              image={image}
              key={image}
            />
          ))
      )}
    </Box>
  )
}

export default SidebarImageGrid
