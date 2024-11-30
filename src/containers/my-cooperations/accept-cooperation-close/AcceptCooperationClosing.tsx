import { Box, styled, Typography } from '@mui/material'
import { FC } from 'react'
import { styles } from './AcceptCooperationClosing.styles'
import { ErrorOutlineRounded } from '@mui/icons-material'
import Button from '~/design-system/components/button/Button'
import { useTranslation } from 'react-i18next'

interface AcceptCooperationClosureProps {
  user: string
  onAccept: () => void
}

const BoldText = styled('span')({
  fontWeight: 500
})

const AcceptCooperationClosing: FC<AcceptCooperationClosureProps> = ({
  user,
  onAccept
}) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.root}>
      <Box>
        <Box sx={styles.title}>
          <ErrorOutlineRounded />
          <Typography>{t('titles.acceptCooperationClosing')}</Typography>
        </Box>
        <Typography sx={styles.body}>
          <BoldText>{user}</BoldText>
          {t('cooperationDetailsPage.closingMessage1')}
          <BoldText>{t('cooperationDetailsPage.accessDuration')}</BoldText>
          {t('cooperationDetailsPage.closingMessage2')}
        </Typography>
      </Box>
      <Button color='tonal-error' onClick={onAccept} size='xs'>
        {t('cooperationDetailsPage.acceptBtn')}
      </Button>
    </Box>
  )
}

export default AcceptCooperationClosing
