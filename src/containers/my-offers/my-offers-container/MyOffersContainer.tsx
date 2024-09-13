import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import MyOffersCard from '~/containers/my-offers/my-offers-card/MyOffersCard'
import EditOffer from '~/containers/offer-page/edit-offer/EditOffer'
import { SortHook } from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { adjustColumns, createUrlPath } from '~/utils/helper-functions'

import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import {
  columns,
  removeColumnRules
} from '~/containers/my-offers/my-offers-container/MyOffersContainer.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  ButtonVariantEnum,
  Offer,
  SizeEnum,
  TableActionFunc,
  TableRowAction
} from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

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
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const { userRole } = useAppSelector((state) => state.appMain)

  const columnsToShow = adjustColumns<Offer>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const handleOpenDrawer = (id: string) => {
    const offer = items.find(({ _id }) => _id === id) ?? null
    setSelectedOffer(offer)
    openDrawer()
  }

  const createButtonActions = (id: string) => [
    {
      label: t('myOffersPage.editButton'),
      buttonProps: {
        variant: ButtonVariantEnum.Tonal,
        onClick: () => handleOpenDrawer(id)
      }
    },
    {
      label: t('common.labels.viewDetails'),
      buttonProps: {
        component: Link,
        to: createUrlPath(authRoutes.offerDetails.path, id)
      }
    }
  ]

  const editOffer: TableActionFunc = (id) => {
    handleOpenDrawer(id as string)
  }

  const viewDetails: TableActionFunc = (id) => {
    navigate(createUrlPath(authRoutes.offerDetails.path, id as string))
  }

  const rowActions: TableRowAction[] = [
    { label: t(`myOffersPage.editButton.${userRole}`), func: editOffer },
    { label: t('common.labels.viewDetails'), func: viewDetails }
  ]

  const offerCards = items.map((item) => (
    <AppCard key={item._id}>
      <MyOffersCard
        buttonActions={createButtonActions(item._id)}
        offer={item}
      />
    </AppCard>
  ))

  const myOffersGrid = <Box sx={styles.root}>{offerCards}</Box>

  const myOffersTable = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items }}
      rowActions={rowActions}
      size={SizeEnum.Small}
      sort={sort}
      sx={styles.table}
    />
  )

  return (
    <>
      {showTable ? myOffersTable : myOffersGrid}
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <EditOffer closeDrawer={closeDrawer} offer={selectedOffer} />
      </AppDrawer>
    </>
  )
}

export default MyOffersContainer
