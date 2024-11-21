import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/app-progress-bar-line/AppProgressBarLine.styles'
import { LinearProgress } from '@mui/material'
import { UserRoleEnum } from '~/types'
import {
  studentLabelsPercentage,
  tutorLabelsPercentage
} from './AppProgressBarLine.constans'
import { AccessTime } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const labelsValue =
    userRole === UserRoleEnum.Student
      ? studentLabelsPercentage
      : tutorLabelsPercentage
  const labelsWithPercentForCooperation = (
    <Box sx={styles.wrapperMainLabelForCoop}>
      <Typography sx={styles.primaryLabelsCoop} variant='body2'>
        {t('cooperationDetailsPage.progressBar.yourProgress')}
      </Typography>
      <Box sx={styles.wrapperTypographyProgressCoop}>
        <Typography sx={styles.completedLabel} variant='h5'>
          {`${value}% ${t('cooperationDetailsPage.progressBar.completed')}`}
        </Typography>
        <Box sx={styles.wrapperTitleWithIconCoop}>
          <AccessTime sx={styles.accessTimeIcon} />
          <Typography sx={styles.primaryLabelsCoop} variant='subtitle1'>
            {`${100 - value}% ${t('cooperationDetailsPage.progressBar.needToComplete')}`}
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
