import { Box } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/show-more-collapse/ShowMoreCollapse.styles'

const ShowMoreCollapse = ({
  title,
  description,
  collapsedSize = 70,
  collapsedTextLength = 390,
  ...props
}) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const handleChange = () => {
    setExpanded((prev) => !prev)
  }

  const hasMoreText = description.length > collapsedTextLength
  const collapsedHeight =
    (description.length / collapsedTextLength) * collapsedSize

  const collapsedDescription = (
    <Typography sx={styles.description(collapsedHeight)}>
      {expanded ? description : description.slice(0, collapsedTextLength)}
    </Typography>
  )

  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>

      <Collapse collapsedSize={collapsedSize} in={expanded} {...props}>
        {collapsedDescription}
      </Collapse>

      {hasMoreText && (
        <Typography onClick={handleChange} sx={styles.showBtnText}>
          {t(expanded ? 'common.showLess' : 'common.showMore')}
        </Typography>
      )}
    </Box>
  )
}

export default ShowMoreCollapse
