import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/app-progress-bar-line/AppProgressBarLine.styles'

const AppProgressBar = ({ value }) => {
  const { isMobile } = useBreakpoints()
  const fillerRelativePercentage = (100 / value) * 100
  const labelsValue = [0, 20, 40, 60, 80, 100]

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
      <Box role='progressbar' sx={styles.progress}>
        <Box sx={{ ...styles.fillInPercent, width: `${value}%` }}>
          <Box
            sx={{ ...styles.scale, width: `${fillerRelativePercentage}%` }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AppProgressBar
