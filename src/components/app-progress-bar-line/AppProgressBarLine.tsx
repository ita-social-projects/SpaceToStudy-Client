import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/app-progress-bar-line/AppProgressBarLine.styles'
import { LinearProgress } from '@mui/material'
import { UserRoleEnum } from '~/types'

import Image from '~/assets/img/cooperation-details/clock.svg'

interface AppProgressBarLineProps {
  value: number
  userRole: UserRoleEnum | ''
  isCooperationActivities?: boolean
}

const AppProgressBarLine: FC<AppProgressBarLineProps> = ({
  value,
  userRole,
  isCooperationActivities = false
}) => {
  const { isMobile } = useBreakpoints()
  const labelsValue =
    userRole === UserRoleEnum.Student
      ? [0, 25, 50, 75, 100]
      : [0, 20, 40, 60, 80, 100]
  const labelsWithPercentForCooperation = (
    <Box width={'100%'}>
      <Typography color={'primary.500'} fontSize={'12px'} variant='subtitle1'>
        Your progress
      </Typography>
      <Box sx={styles.wrapperTypographyProgressCoop}>
        <Typography color={'#2B6E6E'} fontSize={'20px'} variant='h5'>
          {`${value}% completed`}
        </Typography>
        <Box display={'flex'}>
          <Box component='img' marginRight={'8px'} src={Image} />
          <Typography
            color={'primary.500'}
            fontSize={'12px'}
            variant='subtitle1'
          >
            {`${100 - value}% to complete`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
  const labelsWithPercentForProfile = isMobile ? (
    <Typography color='primary.500' variant='subtitle2'>
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
  const labelsWithPercent = isCooperationActivities
    ? labelsWithPercentForCooperation
    : labelsWithPercentForProfile

  return (
    <Box
      sx={
        isCooperationActivities
          ? styles.wrapperProgressCoop
          : styles.wrapperProgress
      }
    >
      <Box sx={isCooperationActivities ? styles.labelsCoop : styles.labels}>
        {labelsWithPercent}
      </Box>
      <LinearProgress
        sx={
          isCooperationActivities ? styles.progressCoop : styles.progress(value)
        }
        value={value}
        variant='determinate'
      />
    </Box>
  )
}

export default AppProgressBarLine
