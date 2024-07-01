import { FC } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { getCategoryIcon } from '~/services/category-icon-service'

import palette from '~/styles/app-theme/app.pallete'
import { styles } from '~/components/card-with-link/CardWithLink.styles'

interface CardWithLinkProps {
  icon: string
  iconColor: string
  title: string
  description: string
  link: string
}

const hexColorPattern = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i

const CardWithLink: FC<CardWithLinkProps> = ({
  icon,
  iconColor,
  title,
  description,
  link
}) => {
  const Icon = getCategoryIcon(icon)
  const color = hexColorPattern.test(iconColor)
    ? iconColor
    : palette.success[500]

  return (
    <AppCard link={link} sx={styles.card}>
      <Box sx={styles.iconContainer(color)}>
        <Icon sx={styles.icon(color)} />
      </Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
