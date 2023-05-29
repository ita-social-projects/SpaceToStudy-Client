import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import AppPagination from '~/components/app-pagination/AppPagination'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'

import { styles } from '~/pages/my-cooperations/MyCooperations.styles'
import { ProficiencyLevelEnum, StatusEnum } from '~/types'

const mockedCoop = {
  _id: 'mockId',
  offer: {
    title:
      'Hello. There are many variations of passages of There are many variations of passages of...asfjtkspe',
    subject: { _id: 'id', name: 'Quantum Mechanics' }
  },
  user: {
    firstName: 'Kathryn',
    lastName: 'Murphy',
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  price: 1800,
  requiredProficiencyLevel: ProficiencyLevelEnum.Beginner,
  status: StatusEnum.Pending,
  createdAt: '2023-05-13T13:44:25.716Z',
  updatedAt: '2023-05-13T13:44:25.716Z'
}

const MyCooperations = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <Box sx={styles.titleBlock}>
        <Typography sx={styles.title}>{t('cooperationsPage.title')}</Typography>
        <AppButton component={Link}>{t('button.viewMyOffers')}</AppButton>
      </Box>
      <CooperationToolbar />
      <CooperationContainer items={new Array(12).fill(mockedCoop)} />
      <AppPagination pageCount={4} />
    </PageWrapper>
  )
}

export default MyCooperations
