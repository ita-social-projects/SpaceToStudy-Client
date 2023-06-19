import Typography from '@mui/material/Typography'

import { getFormatedDate } from '~/utils/helper-functions'
import StatusChip from '~/components/status-chip/StatusChip'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { Cooperation, StatusEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

export const columns = [
  {
    label: 'cooperationsPage.tableHeaders.name',
    field: 'name',
    calculatedCellValue: (item: Cooperation) => {
      return (
        <UserProfileInfo
          _id={item.user._id}
          firstName={item.user.firstName}
          lastName={item.user.lastName}
          photo={item.user.photo}
          role={item.user.role}
          sx={styles.profileInfo}
        />
      )
    }
  },
  {
    label: 'cooperationsPage.tableHeaders.title',
    calculatedCellValue: (item: Cooperation) => (
      <Typography sx={styles.title}>{item.offer.title}</Typography>
    )
  },
  {
    label: 'cooperationsPage.tableHeaders.subject',
    calculatedCellValue: (item: Cooperation) => (
      <SubjectLevelChips
        proficiencyLevel={item.proficiencyLevel}
        subject={item.offer.subject.name}
        sx={styles.chips}
      />
    )
  },
  {
    label: 'cooperationsPage.tableHeaders.price',
    field: 'price',
    calculatedCellValue: (item: Cooperation) => `${item.price} UAH`
  },
  {
    label: 'cooperationsPage.tableHeaders.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Cooperation) => getFormatedDate(item.updatedAt)
  },
  {
    label: 'cooperationsPage.tableHeaders.status',
    calculatedCellValue: ({ user, needAction, status }: Cooperation) => {
      const cooperationStatus =
        user.role !== needAction && status === StatusEnum.Pending
          ? StatusEnum.NeedAction
          : status
      return <StatusChip status={cooperationStatus} />
    }
  }
]

export const removeColumnRules = {
  tablet: [
    'cooperationsPage.tableHeaders.updated',
    'cooperationsPage.tableHeaders.title'
  ]
}
