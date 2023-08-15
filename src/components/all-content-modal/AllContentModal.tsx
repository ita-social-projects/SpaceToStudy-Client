import { FC, ReactElement, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

import { styles } from '~/components/all-content-modal/AllContentModal.styles'

interface AllContentModalProps {
  icon?: ReactElement
  title: string
  children: ReactNode
}

const AllContentModal: FC<AllContentModalProps> = ({
  icon,
  title,
  children
}) => {
  return (
    <>
      <Box sx={styles.textWithIconWrapper}>
        {icon}
        <Typography sx={styles.text}>{title}</Typography>
      </Box>
      <Box sx={styles.childrenWrapper}>{children}</Box>
    </>
  )
}

export default AllContentModal
