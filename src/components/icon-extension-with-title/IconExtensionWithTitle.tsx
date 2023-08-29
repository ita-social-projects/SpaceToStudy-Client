import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/icon-extension-with-title/IconExtensionWithTitle.styles'

import { convertBytesToProperFormat } from '~/utils/helper-functions'

interface IconExtensionWithTitleProps {
  title: string
  size?: number
}

const IconExtensionWithTitle: FC<IconExtensionWithTitleProps> = ({
  title,
  size
}) => {
  const { t } = useTranslation()

  const fileExtension = title.slice(title.lastIndexOf('.') + 1)
  const convertSize = (incomingSize: number) => {
    const { size: properSize, unit } = convertBytesToProperFormat(incomingSize)
    return properSize + ' ' + t(`common.${unit}`)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      <TitleWithDescription
        description={size && convertSize(size)}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconExtensionWithTitle
