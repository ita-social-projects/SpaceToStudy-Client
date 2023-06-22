import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import { SortHook } from '~/hooks/table/use-sort'
import { useDrawer } from '~/hooks/use-drawer'
import EditOffer from '~/containers/offer-page/edit-offer/EditOffer'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import AppCard from '~/components/app-card/AppCard'
import MyOffersCard from '~/containers/my-offers/my-offers-card/MyOffersCard'
import { ajustColumns, createUrlPath } from '~/utils/helper-functions'

import { ButtonVariantEnum, Offer, SizeEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/my-offers/my-offers-container/MyOffersContainer.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

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

  const columnsToShow = ajustColumns<Offer>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const handleOpenDrawer = (offer: Offer) => {
    setSelectedOffer(offer)
    openDrawer()
  }

  const createButtonActions = (offer: Offer) => [
    {
      label: t('myOffersPage.editButton'),
      buttonProps: {
        variant: ButtonVariantEnum.Tonal,
        onClick: () => handleOpenDrawer(offer)
      }
    },
    {
      label: t('common.labels.viewDetails'),
      buttonProps: {
        component: Link,
        to: createUrlPath(authRoutes.offerDetails.path, offer._id)
      }
    }
  ]

  const offerCards = items.map((item) => (
    <AppCard key={item._id}>
      <MyOffersCard buttonActions={createButtonActions(item)} offer={item} />
    </AppCard>
  ))

  const editOffer = () => null

  const viewDetails = (id: string) => {
    navigate(createUrlPath(authRoutes.offerDetails.path, id))
  }

  const rowActions = [
    { label: t('myOffersPage.editButton'), func: editOffer },
    { label: t('common.labels.viewDetails'), func: viewDetails }
  ]

  const myOffersGrid = (
    <Box sx={styles.root}>
      {offerCards}

      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <EditOffer closeDrawer={closeDrawer} offer={selectedOffer} />
      </AppDrawer>
    </Box>
  )

  const MyOffersTable = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items }}
      rowActions={rowActions}
      size={SizeEnum.Small}
      sort={sort}
      sx={styles.table}
    />
  )

  return showTable ? MyOffersTable : myOffersGrid
}

export default MyOffersContainer
