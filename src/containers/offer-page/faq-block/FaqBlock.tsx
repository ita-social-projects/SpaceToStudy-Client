import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import { useDebounce } from '~/hooks/use-debounce'
import {
  ButtonVariantEnum,
  CreateOfferBlockProps,
  CreateOrUpdateOfferData,
  Faq
} from '~/types'
import { styles } from '~/containers/offer-page/OfferPage.styles'

const FaqBlock = <T extends CreateOrUpdateOfferData>({
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
      const updatedFaq = [...data.FAQ]
      updatedFaq[index] = { ...data.FAQ[index], [key]: e.target.value }
      handleNonInputValueChange('FAQ', updatedFaq)
    }

  const addMoreQuestion = () => {
    if (data.FAQ.length < 5) {
      const updatedFaq = [
        ...data.FAQ,
        { question: '', answer: '', id: `${Date.now()}` }
      ]
      handleNonInputValueChange('FAQ', updatedFaq)
    } else {
      setMaxFaqError(t('offerPage.errorMessages.faq'))
      resetError()
    }
  }

  const removeQuestion = (index: number) => {
    const updatedFaq = data.FAQ.filter((_, idx) => idx !== index)
    handleNonInputValueChange('FAQ', updatedFaq)
  }

  const questionsAnswers = data.FAQ.map((el, idx, array) => (
    <Box key={el.id} sx={styles.faqInputsBlock}>
      <Box sx={styles.faqInputs}>
        <AppTextField
          fullWidth
          label={t('offerPage.labels.question')}
          onChange={handleInputChange('question', idx)}
          value={el.question}
        />
        <AppTextArea
          fullWidth
          label={t('offerPage.labels.answer')}
          maxRows={3}
          onChange={handleInputChange('answer', idx)}
          value={el.answer}
        />
      </Box>
      {array.length > 1 && (
        <IconButton onClick={() => removeQuestion(idx)}>
          <CloseRoundedIcon />
        </IconButton>
      )}
    </Box>
  ))

  return (
    <OrderedListItem number={3} title={t(`offerPage.title.thirdStep`)}>
      <Box sx={styles.specialization}>
        <Typography sx={[styles.description, styles.category]}>
          {t(`offerPage.description.thirdStep.${userRole}`)}
        </Typography>
        {questionsAnswers}
        <Typography sx={styles.faqError}>{maxFaqError}</Typography>
        <AppButton
          onClick={addMoreQuestion}
          sx={styles.faqButton}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.addQuestion')}
        </AppButton>
      </Box>
    </OrderedListItem>
  )
}

export default FaqBlock
