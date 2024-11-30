import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'

import Button from '~/design-system/components/button/Button'

import { useAppSelector } from '~/hooks/use-redux'
import { ComponentEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/add-review-modal/AddReviewModal.styles'

const AddReviewModal = () => {
  const [rating, setRating] = useState<number>(0)
  const [review, setReview] = useState<string>('')
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box component={ComponentEnum.Form} sx={styles.root}>
      <Typography sx={styles.title}>
        {t('cooperationsPage.cooperationDetails.reviewTitle')}
      </Typography>
      <Typography sx={styles.description}>
        {t(`cooperationsPage.cooperationDetails.${userRole}ReviewDescription`)}
      </Typography>
      <Box sx={styles.formWrapper}>
        <Box>
          <Typography>
            {t('cooperationsPage.cooperationDetails.reviewRating')}
          </Typography>
          <Rating
            onChange={(e, newValue) => setRating(newValue ?? 0)}
            precision={0.5}
            value={rating}
          />
        </Box>
        <TextField
          label={t('cooperationsPage.cooperationDetails.reviewLabel')}
          minRows={3}
          multiline
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />
      </Box>
      <Box sx={styles.buttonGroup}>
        <Button color='tonal'>
          {t('cooperationsPage.cooperationDetails.cancel')}
        </Button>
        <Button type='submit'>
          {t('cooperationsPage.cooperationDetails.submit')}
        </Button>
      </Box>
    </Box>
  )
}

export default AddReviewModal
