import { FC, ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'

import { ComponentEnum, ButtonVariantEnum, Media } from '~/types'
import { styles } from '~/components/clickable-image/ClickableImage.styles'

interface ClickableImageProps extends Omit<BoxProps, 'onClick'> {
  onClick?: (image: Media) => void
  image: Media
  children?: ReactNode
}

const ClickableImage: FC<ClickableImageProps> = ({
  onClick,
  image,
  children,
  ...props
}) => {
  return (
    <AppButton
      onClick={() => onClick?.(image)}
      sx={styles.imageButton}
      variant={ButtonVariantEnum.Text}
    >
      <Box
        alt={image.name}
        component={ComponentEnum.Img}
        src={image.path}
        sx={styles.image}
        {...props}
      />
      {children}
    </AppButton>
  )
}

export default ClickableImage
