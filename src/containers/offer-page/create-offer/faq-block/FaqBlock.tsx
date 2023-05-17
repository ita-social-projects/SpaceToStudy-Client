import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'

import AppButton from '~/components/app-button/AppButton'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import { useDebounce } from '~/hooks/use-debounce'
import {
  CreateOfferBlockProps,
  CreateOfferData,
  Faq,
  VariantEnum
} from '~/types'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'

const FaqBlock = <T extends CreateOfferData>({
  data,
  handleNonInputValueChange
}: Pick<CreateOfferBlockProps<T>, 'data' | 'handleNonInputValueChange'>) => {
  const [maxFaqError, setMaxFaqError] = useState<string | null>(null)
  const { userRole } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()

  const resetError = useDebounce(() => setMaxFaqError(null), 5000)

  const handleInputChange =
    (key: keyof Faq, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedFaq = [...data.faq]
      updatedFaq[index] = { ...data.faq[index], [key]: e.target.value }
      handleNonInputValueChange('faq', updatedFaq)
    }

  const addMoreQuestion = () => {
    if (data.faq.length < 5) {
      const updatedFaq = [...data.faq, { question: '', answer: '' }]
      handleNonInputValueChange('faq', updatedFaq)
    } else {
      setMaxFaqError(t('offerPage.createOffer.errorMessages.faq'))
      resetError()
    }
  }

  const questionsAnswers = data.faq.map((el, idx) => (
    <Box key={idx}>
      <AppTextField
        fullWidth
        label={t('offerPage.createOffer.labels.question')}
        onChange={handleInputChange('question', idx)}
        value={el.question}
      />
      <AppTextArea
        fullWidth
        label={t('offerPage.createOffer.labels.answer')}
        maxRows={3}
        onChange={handleInputChange('answer', idx)}
        value={el.answer}
      />
    </Box>
  ))

  return (
    <OrderedListItem
      number={3}
      title={t(`offerPage.createOffer.title.thirdStep`)}
    >
      <Box sx={styles.specialization}>
        <Typography sx={[styles.description, styles.category]}>
          {t(`offerPage.createOffer.description.thirdStep.${userRole}`)}
        </Typography>
        {questionsAnswers}
        <Typography sx={styles.faqError}>{maxFaqError}</Typography>
        <AppButton
          onClick={addMoreQuestion}
          sx={styles.faqButton}
          variant={VariantEnum.Tonal}
        >
          {t('button.addQuestion')}
        </AppButton>
      </Box>
    </OrderedListItem>
  )
}

export default FaqBlock
