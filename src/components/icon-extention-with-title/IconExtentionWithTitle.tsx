import { FC } from 'react'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/icon-extention-with-title/IconExtentionWithTitle.styles'

import { convertBytesToProperSize } from '~/utils/bytes-to-proper-size'
interface IconExtentionWithTitleProps {
  title: string
  description?: number
}

const IconExtentionWithTitle: FC<IconExtentionWithTitleProps> = ({
  title,
  description
}) => {
  const fileExtension = title.slice(title.lastIndexOf('.') + 1)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      <TitleWithDescription
        description={description && convertBytesToProperSize(description)}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconExtentionWithTitle
