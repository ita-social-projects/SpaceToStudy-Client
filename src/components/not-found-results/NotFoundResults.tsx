import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { ButtonVariantEnum } from '~/types'
import { spliceSx } from '~/utils/helper-functions'
import howItWorksStudentSecond from '~/assets/img/find-offer/search_icon.svg'
import { styles } from '~/components/not-found-results/NotFoundResults.styles'

interface NotFoundResultsProps {
  description: string
  buttonText?: string
  onClick?: () => void
  sx?: { [key: string]: SxProps | undefined }
}

const NotFoundResults: FC<NotFoundResultsProps> = ({
  description,
  buttonText,
  onClick,
  sx
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={spliceSx(styles.container, sx?.container)}>
      <ImgTitleDescription
        description={description}
        img={howItWorksStudentSecond}
        style={spliceSx(styles.imgTitleDescription, sx?.imgTitleDescription)}
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
