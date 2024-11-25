import { FC, ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

import Button from '~scss-components/button/Button'

import { ComponentEnum, Media } from '~/types'
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
    <Button
      onClick={() => onClick?.(image)}
      sx={styles.imageButton}
      variant='text-secondary'
    >
      <Box
        alt={image.name}
        component={ComponentEnum.Img}
        src={image.path}
        sx={styles.image}
        {...props}
      />
      {children}
    </Button>
  )
}

export default ClickableImage
