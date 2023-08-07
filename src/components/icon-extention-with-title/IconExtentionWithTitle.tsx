import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/icon-extention-with-title/IconExtentionWithTitle.styles'

interface IconExtentionWithTitleProps {
  title: string
  description: number
}

const IconExtentionWithTitle: FC<IconExtentionWithTitleProps> = ({
  title,
  description
}) => {
  const { t } = useTranslation()
  const fileExtension = title.slice(title.lastIndexOf('.') + 1)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      <TitleWithDescription
        description={description && `${description} ${t('common.megabytes')}`}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconExtentionWithTitle
