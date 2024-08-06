import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Collapse, { CollapseProps } from '@mui/material/Collapse'

import { styles } from '~/components/show-more-collapse/ShowMoreCollapse.styles'

interface ShowMoreCollapseProps extends CollapseProps {
  title?: string
  description: string
  collapsedSize?: number
  collapsedTextLength?: number
  withoutTitle?: boolean
}

const ShowMoreCollapse: FC<ShowMoreCollapseProps> = ({
  title,
  description,
  collapsedSize = 70,
  collapsedTextLength = 390,
  withoutTitle = false,
  ...props
}) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleChange = () => {
    setExpanded((prev) => !prev)
  }

  const hasMoreText = description.length > collapsedTextLength
  const collapsedHeight =
    (description.length / collapsedTextLength) * collapsedSize

  const hasLongWord = description.split(' ').some((word) => word.length > 150)

  const collapsedDescription = (
    <Typography
      sx={hasLongWord ? styles.longWord : styles.description(collapsedHeight)}
    >
      {description}
    </Typography>
  )

  return (
    <Box sx={styles.aboutOfferContainer}>
      {withoutTitle ? '' : <Typography sx={styles.title}>{title}</Typography>}

      <Collapse collapsedSize={collapsedSize} in={expanded} {...props}>
        {collapsedDescription}
      </Collapse>

      {hasMoreText && !hasLongWord && (
        <Typography onClick={handleChange} sx={styles.showBtnText}>
          {t(expanded ? 'common.showLess' : 'common.showMore')}
        </Typography>
      )}
    </Box>
  )
}

export default ShowMoreCollapse
