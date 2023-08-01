import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { styles } from '~/components/all-content-modal/AllContentModal.styles'

interface AllContentModalProps {
  Icon?: React.ComponentType
  title: string
}

const AllContentModal: FC<AllContentModalProps> = ({
  Icon,
  title,
  children
}) => {
  return (
    <>
      <Box sx={styles.textWithIconWrapper}>
        {Icon && <Icon />}
        <Typography sx={styles.textWithIconWrapper.text}>{title}</Typography>
      </Box>
      <Box sx={styles.childrenWrapper}>{children}</Box>
    </>
  )
}

export default AllContentModal
