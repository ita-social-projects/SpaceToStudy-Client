import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/app-progress-bar-line/AppProgressBarLine.styles'
import { LinearProgress } from '@mui/material'
import { UserRoleEnum } from '~/types'

interface AppProgressBarLineProps {
  value: number
  userRole: UserRoleEnum | ''
}

const AppProgressBarLine: FC<AppProgressBarLineProps> = ({
  value,
  userRole
}) => {
  const { isMobile } = useBreakpoints()
  const labelsValue =
    userRole === UserRoleEnum.Student
      ? [0, 25, 50, 75, 100]
      : [0, 20, 40, 60, 80, 100]

  const labelsWithPercent = isMobile ? (
    <Typography color={'primary.500'} variant='subtitle2'>
      {`${value}%`}
    </Typography>
  ) : (
    labelsValue.map((item) => (
      <Typography
        color={value >= item ? 'primary.500' : 'primary.300'}
        key={item}
        variant='subtitle2'
      >
        {`${item}%`}
      </Typography>
    ))
  )

  return (
    <Box sx={styles.wrapperProgress}>
      <Box sx={styles.labels}>{labelsWithPercent}</Box>
      <LinearProgress
        sx={styles.progress(value)}
        value={value}
        variant='determinate'
      />
    </Box>
  )
}

export default AppProgressBarLine
