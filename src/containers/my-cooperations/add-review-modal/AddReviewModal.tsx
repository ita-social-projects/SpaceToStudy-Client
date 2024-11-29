import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

import Button from '~/design-system/components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { ComponentEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/add-review-modal/AddReviewModal.styles'

const AddReviewModal = () => {
  return (
    <Box component={ComponentEnum.Form} sx={styles.root}>
      <TitleWithDescription
        description='Share your experience about the collaboration with the student/tutor. Your feedback will help improve the platform and user interactions.'
        style={styles.titleWithDescription}
        title='Leave your review'
      />
      <Box sx={styles.formWrapper}>
        <Typography>
          Rate your experience:
        </Typography>
        <Rating precision={0.5} />
      </Box>
      <Box sx={styles.buttonGroup}>
        <Button color='tonal'>Cancel</Button>
        <Button type='submit'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddReviewModal
