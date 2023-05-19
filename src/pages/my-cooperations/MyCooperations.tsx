import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'

import { styles } from '~/pages/my-cooperations/MyCooperations.styles'
import { ProficiencyLevelEnum, StatusEnum } from '~/types'

const mockedCoop = {
  offer: {
    title:
      'Hello. There are many variations of passages of There are many variations of passages of...',
    description:
      'Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... ',
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
  createdAt: '2023-05-13T13:44:25.716Z'
}

const MyCooperations = () => {
  return (
    <Container sx={styles.container}>
      <Box>My Cooperations</Box>
      <CooperationCard cooperation={mockedCoop} />
    </Container>
  )
}

export default MyCooperations
