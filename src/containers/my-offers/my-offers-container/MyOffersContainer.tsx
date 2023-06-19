import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import useBreakpoints from '~/hooks/use-breakpoints'
import { SortHook } from '~/hooks/table/use-sort'
import Box from '@mui/material/Box'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import AppCard from '~/components/app-card/AppCard'
import MyOffersCard from '~/containers/my-offers/my-offers-card/MyOffersCard'
import { ajustColumns, createUrlPath } from '~/utils/helper-functions'

import { ButtonVariantEnum, Offer, SizeEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/my-offers/my-offers-container/MyOffersContainer.constants'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'

interface MyOffersContainerProps {
  items: Offer[]
  showTable: boolean
  sort: SortHook
}

const MyOffersContainer: FC<MyOffersContainerProps> = ({
  items,
  sort,
  showTable
}) => {
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()

  const columnsToShow = ajustColumns<Offer>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const myOffersGrid = (
    <Box sx={styles.root}>
      {items.map((item) => {
        const buttonActions = [
          {
            label: t('myOffersPage.editButton'),
            buttonProps: {
              variant: ButtonVariantEnum.Tonal,
              disabled: true
            }
          },
          {
            label: t('common.labels.viewDetails'),
            buttonProps: {
              component: Link,
              to: createUrlPath(authRoutes.offerDetails.path, item._id)
            }
          }
        ]
        return (
          <AppCard key={item._id}>
            <MyOffersCard buttonActions={buttonActions} offer={item} />
          </AppCard>
        )
      })}
    </Box>
  )

  const MyOffersTable = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items }}
      size={SizeEnum.Small}
      sort={sort}
      sx={styles.table}
    />
  )

  return showTable ? MyOffersTable : myOffersGrid
}

export default MyOffersContainer
