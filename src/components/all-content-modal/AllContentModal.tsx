import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import { styles } from '~/components/all-content-modal/AllContentModal.styles'

interface AllContentModalProps {
  icon?: React.ReactElement
  title: string
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
        <Typography sx={styles.textWithIconWrapper.text}>{title}</Typography>
      </Box>
      <Box sx={styles.childrenWrapper}>{children}</Box>
    </>
  )
}

export default AllContentModal
