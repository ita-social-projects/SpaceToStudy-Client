import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { VariantEnum } from '~/types'
import howItWorksStudentSecond from '~/assets/img/find-offer/search_icon.svg'
import { styles } from '~/components/not-found-results/NotFoundResults.styles'

interface NotFoundResultsProps {
  description: string
  buttonText?: string
  isHide?: boolean
  onClick?: () => void
}

const NotFoundResults: FC<NotFoundResultsProps> = ({
  description,
  buttonText,
  isHide = false,
  onClick
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <ImgTitleDescription
        description={description}
        img={howItWorksStudentSecond}
        style={styles.imgTitleDescription}
        title={t('constant.resultsNotFound')}
      />
      {!isHide && (
        <AppButton
          onClick={onClick}
          sx={styles.button}
          variant={VariantEnum.Tonal}
        >
          {buttonText}
        </AppButton>
      )}
    </Box>
  )
}

export default NotFoundResults
