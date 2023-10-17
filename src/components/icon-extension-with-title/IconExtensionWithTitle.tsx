import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { convertBytesToProperFormat } from '~/utils/helper-functions'
import { styles } from '~/components/icon-extension-with-title/IconExtensionWithTitle.styles'

interface IconExtensionWithTitleProps {
  title: string
  description?: string
  size?: number
}

const IconExtensionWithTitle: FC<IconExtensionWithTitleProps> = ({
  title,
  description,
  size
}) => {
  const { t } = useTranslation()

  const [fileExtension] = title.split('.').reverse()

  const convertSize = (incomingSize: number) => {
    const { size: properSize, unit } = convertBytesToProperFormat(incomingSize)
    return properSize + ' ' + t(`common.${unit}`)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      <TitleWithDescription
        description={size ? convertSize(size) : description}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconExtensionWithTitle
