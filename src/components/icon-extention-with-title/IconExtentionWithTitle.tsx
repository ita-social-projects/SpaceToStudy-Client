import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/icon-extention-with-title/IconExtentionWithTitle.styles'

import { convertBytesToProperFormat } from '~/utils/helper-functions'

interface IconExtentionWithTitleProps {
  title: string
  description?: number
}

const IconExtentionWithTitle: FC<IconExtentionWithTitleProps> = ({
  title,
  description
}) => {
  const { t } = useTranslation()

  const fileExtension = title.slice(title.lastIndexOf('.') + 1)
  const convertDescription = (descriptionNumber: number) => {
    const { size, unit } = convertBytesToProperFormat(descriptionNumber)
    return size + ' ' + t(`common.${unit}`)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      <TitleWithDescription
        description={description && convertDescription(description)}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconExtentionWithTitle
