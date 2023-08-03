import { FC } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'

import { ComponentEnum, ButtonVariantEnum } from '~/types'
import { styles } from '~/components/clickable-image/ClickableImage.styles'

interface ClickableImageProps extends BoxProps {
  onUserClick?: (image: string) => void
  image: string
}

const ClickableImage: FC<ClickableImageProps> = ({
  onUserClick,
  image,
  children,
  ...props
}) => {
  return (
    <AppButton
      data-testid='sidebar-image'
      onClick={() => onUserClick?.(image)}
      sx={styles.imageButton}
      variant={ButtonVariantEnum.Text}
    >
      <Box
        alt={image}
        component={ComponentEnum.Img}
        src={image}
        sx={styles.image}
        {...props}
      />
      {children}
    </AppButton>
  )
}

export default ClickableImage
