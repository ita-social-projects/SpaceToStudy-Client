import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { ButtonVariantEnum } from '~/types'
import howItWorksStudentSecond from '~/assets/img/find-offer/search_icon.svg'
import { styles } from '~/components/not-found-results/NotFoundResults.styles'

interface NotFoundResultsProps {
  description: string
  buttonText?: string
  onClick?: () => void
}

const NotFoundResults: FC<NotFoundResultsProps> = ({
  description,
  buttonText,
  onClick
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <ImgTitleDescription
        description={description}
        img={howItWorksStudentSecond}
        style={styles.imgTitleDescription}
        title={t('errorMessages.resultsNotFound')}
      />
      {buttonText && (
        <AppButton
          onClick={onClick}
          sx={styles.button}
          variant={ButtonVariantEnum.Tonal}
        >
          {buttonText}
        </AppButton>
      )}
    </Box>
  )
}

export default NotFoundResults
