import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import AppButton from '~/components/app-button/AppButton'

import { styles } from './AcceptCooperationClosing.styles'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { SizeEnum } from '~/types'

interface AcceptCooperationClosureProps {
  user: string
  onAccept: () => void
}

const AcceptCooperationClosing: FC<AcceptCooperationClosureProps> = ({
  user,
  onAccept
}) => {
  return (
    <Box sx={styles.root}>
      <Box>
        <Box sx={styles.title}>
          <ErrorOutlineRounded />
          <Typography>Cooperation closing process</Typography>
        </Box>
        <Typography sx={styles.body}>
          <span style={styles.span}>{user}</span> started a closing process for
          the current cooperation. You will have{' '}
          <span style={styles.span}> 1 month of access</span> to study materials
          after the cooperation has been closed.
        </Typography>
      </Box>
      <AppButton
        color='error'
        onClick={onAccept}
        size={SizeEnum.Small}
        sx={styles.button}
      >
        Accept
      </AppButton>
    </Box>
  )
}

export default AcceptCooperationClosing
