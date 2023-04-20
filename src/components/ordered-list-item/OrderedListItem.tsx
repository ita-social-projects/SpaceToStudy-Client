import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/ordered-list-item/OrderedListItem.styles'

type OrderedListItemProps = {
  title: string
  description?: string
  number: number
  children?: ReactNode
  sx?: SxProps
}

const OrderedListItem = ({
  title,
  description,
  number,
  children,
  sx
}: OrderedListItemProps) => {
  const titleWithNumber = (
    <Typography component='span' sx={styles.title}>
      <Typography component='span' sx={styles.number}>
        {number}
      </Typography>
      {title}
    </Typography>
  )

  return (
    <Box sx={sx}>
      <TitleWithDescription
        description={description}
        style={styles.blockTitle}
        title={titleWithNumber}
      />
      {children}
    </Box>
  )
}

export default OrderedListItem
