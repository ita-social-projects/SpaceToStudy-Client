import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import styles from '~/containers/quiz/quiz-info-section/QuizInfoSection.styles'

type QuizInfoProps = {
  title: string
  firstColumn: string
  secondColumn?: string
}

const QuizInfo = ({ title, firstColumn, secondColumn }: QuizInfoProps) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>{`${title}:`}</Typography>
      <Box sx={styles.infoWrapper}>
        <Typography sx={styles.info}>{firstColumn}</Typography>
        {secondColumn && (
          <>
            <Divider
              flexItem
              orientation='vertical'
              sx={styles.divider}
              variant='middle'
            />
            <Typography sx={styles.info}>{secondColumn}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default QuizInfo
