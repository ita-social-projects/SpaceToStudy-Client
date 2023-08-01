import { FC } from 'react'

import { Box } from '@mui/material'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum } from '~/types'

import { styles } from '~/components/clickable-image/ClickableImage.styles'

interface ClickableImageProps {
  clickFunction?(image: string): void
  image: string
}

const ClickableImage: FC<ClickableImageProps> = ({
  clickFunction,
  image,
  children
}) => {
  return (
    <AppButton
      data-testid='sidebar-image'
      onClick={() => clickFunction && clickFunction(image)}
      sx={styles.imageButton}
      variant={ButtonVariantEnum.Text}
    >
      <Box alt={image} component='img' src={image} sx={styles.image} />
      {children}
    </AppButton>
  )
}

export default ClickableImage
