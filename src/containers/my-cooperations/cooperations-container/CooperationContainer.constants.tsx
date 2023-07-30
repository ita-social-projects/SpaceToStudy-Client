import Typography from '@mui/material/Typography'

import StatusChip from '~/components/status-chip/StatusChip'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import { getFormattedDate } from '~/utils/helper-functions'

import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import {
  AdditionalPropsInterface,
  Cooperation,
  Offer,
  RemoveColumnRules,
  StatusEnum
} from '~/types'

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
    calculatedCellValue: (item: Offer, { t }: AdditionalPropsInterface) =>
      `${item.price} ${t('common.uah')}`
  },
  {
    label: 'cooperationsPage.tableHeaders.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Cooperation) =>
      getFormattedDate({ date: item.updatedAt })
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

export const removeColumnRules: RemoveColumnRules<Cooperation> = {
  tablet: [
    'cooperationsPage.tableHeaders.updated',
    'cooperationsPage.tableHeaders.title'
  ]
}
