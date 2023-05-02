import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/not-found-results/NotFoundResults.styles'
import howItWorksStudentSecond from '~/assets/img/find-offer/search_icon.svg'
import { VariantEnum } from '~/types'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

interface NotFoundResultsProps {
  description: string
  buttonName: string
  onClick?: () => void
}

const NotFoundResults: FC<NotFoundResultsProps> = ({
  description,
  buttonName,
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
      <AppButton
        onClick={onClick}
        sx={styles.button}
        variant={VariantEnum.Tonal}
      >
        {buttonName}
      </AppButton>
    </Box>
  )
}

export default NotFoundResults
