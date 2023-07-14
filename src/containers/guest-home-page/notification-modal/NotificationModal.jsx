import { Box } from '@mui/material'

import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'

const NotificationModal = ({
  description,
  buttonTitle,
  title,
  img,
  onClose
}) => {
  return (
    <Box sx={styles.root}>
      <ImgTitleDescription
        description={description}
        img={img}
        style={styles.imgTitleDesc}
        title={title}
      />
      <AppButton onClick={onClose}>{buttonTitle}</AppButton>
    </Box>
  )
}

export default NotificationModal
