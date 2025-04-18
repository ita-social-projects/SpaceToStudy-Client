import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'

import Button from '~/design-system/components/button/Button'

import { ReviewService } from '~/services/review-service'
import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { getErrorKey } from '~/utils/get-error-key'
import { useModalContext } from '~/context/modal-context'
import {
  initialValues,
  validations
} from '~/containers/my-cooperations/add-review-modal/AddReviewModal.constants'

import {
  ComponentEnum,
  type ReviewDataFromCooperation,
  type ReviewData,
  type ErrorResponse
} from '~/types'
import { styles } from '~/containers/my-cooperations/add-review-modal/AddReviewModal.styles'
import useMutation from '~/hooks/use-mutation'

interface AddReviewModalProps {
  data: ReviewDataFromCooperation
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ data }) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()
  const { closeModal } = useModalContext()

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: t('cooperationsPage.cooperationDetails.success')
      })
    )
    closeModal()
  }

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const { mutate: submitReview } = useMutation({
    mutationFn: ReviewService.submitReview,
    onSuccess: handleResponse,
    onError: handleResponseError
  })

  const {
    data: reviewData,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<ReviewData>({
    initialValues,
    validations,
    onSubmit: (reviewData) => {
      if (reviewData) {
        submitReview({
          ...data,
          comment: reviewData.comment,
          rating: reviewData.rating
        })
      }
    },
    submitWithData: true
  })

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
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
            onChange={(e, newValue) =>
              handleNonInputValueChange('rating', newValue ?? 0)
            }
            value={reviewData.rating}
          />
        </Box>
        <TextField
          label={t('cooperationsPage.cooperationDetails.reviewLabel')}
          minRows={3}
          multiline
          onChange={handleInputChange('comment')}
          value={reviewData.comment}
        />
      </Box>
      <Box sx={styles.buttonGroup}>
        <Button onClick={closeModal} variant='tonal'>
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
