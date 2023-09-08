import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import ClickableImage from '~/components/clickable-image/ClickableImage'
import AllContentModal from '~/components/all-content-modal/AllContentModal'

import { useModalContext } from '~/context/modal-context'
import { maxElemToShow } from '~/components/sidebar-content-box/SidebarContentBox.constants'
import { SizeEnum, Media } from '~/types'
import { styles } from '~/components/sidebar-image-grid/SidebarImageGrid.styles'

interface SidebarImageGridProps {
  images: Media[]
  onClick?: () => void
  compactMode?: boolean
}

const SidebarImageGrid: FC<SidebarImageGridProps> = ({
  images,
  onClick,
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
          <Box component='img' src={image.path} sx={styles.modalImage} />
        </AllContentModal>
      )
    })
  }

  const compactGrid = images.slice(0, maxElemToShow).map((image, index) => {
    const hasMoreElem = index === maxElemToShow - 1 && mediaSize > maxElemToShow

    return (
      <ClickableImage
        image={image}
        key={image._id}
        onClick={hasMoreElem ? onClick : showImage}
      >
        {hasMoreElem && (
          <Box>
            <AddIcon fontSize={SizeEnum.Small} />
            {mediaSize - maxElemToShow}
          </Box>
        )}
      </ClickableImage>
    )
  })

  const expansiveGrid = images.map((image) => (
    <ClickableImage image={image} key={image._id} onClick={showImage} />
  ))

  return (
    <Box sx={styles.imageGrid}>{compactMode ? compactGrid : expansiveGrid}</Box>
  )
}

export default SidebarImageGrid
