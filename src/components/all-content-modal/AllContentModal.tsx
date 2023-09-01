import { FC, ReactElement, ReactNode } from 'react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/all-content-modal/AllContentModal.styles'
import { spliceSx } from '~/utils/helper-functions'

interface AllContentModalProps {
  icon?: ReactElement
  title: string
  sx?: {
    container?: SxProps
    textWithIconWrapper?: SxProps
    text?: SxProps
  }
  children: ReactNode
}

const AllContentModal: FC<AllContentModalProps> = ({
  icon,
  title,
  sx = {},
  children
}) => {
  return (
    <Box sx={spliceSx(styles.container, sx.container)}>
      <Box sx={spliceSx(styles.textWithIconWrapper, sx.textWithIconWrapper)}>
        {icon}
        <Typography sx={spliceSx(styles.text, sx.text)}>{title}</Typography>
      </Box>
      {children}
    </Box>
  )
}

export default AllContentModal
