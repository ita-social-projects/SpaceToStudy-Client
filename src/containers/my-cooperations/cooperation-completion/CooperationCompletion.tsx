import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import SettingItem from '~/components/setting-item/SettingItem'
import AppButton from '~/components/app-button/AppButton'
import { useModalContext } from '~/context/modal-context'

import { styles } from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion.styles'
import { ButtonVariantEnum, SizeEnum, ReviewDataFromCooperation } from '~/types'
import AddReviewModal from '~/containers/my-cooperations/add-review-modal/AddReviewModal'

const CooperationCompletion: FC<ReviewDataFromCooperation> = ({ data }) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const openAddReviewModal = () => {
    openModal({
      component: <AddReviewModal data={data} />
    })
  }

  return (
    <Box>
      <Divider />
      <Typography sx={styles.title}>
        {t('cooperationsPage.cooperationDetails.completionTitle')}
      </Typography>
      <SettingItem
        subtitle={t(
          'cooperationsPage.cooperationDetails.closeCooperationDescription'
        )}
        title={t('cooperationsPage.cooperationDetails.closeCooperationTitle')}
      >
        <AppButton
          onClick={openAddReviewModal}
          size={SizeEnum.Medium}
          sx={styles.closeBtn}
          variant={ButtonVariantEnum.Text}
        >
          {t('cooperationsPage.cooperationDetails.closeCooperationBtn')}
        </AppButton>
      </SettingItem>
    </Box>
  )
}

export default CooperationCompletion
