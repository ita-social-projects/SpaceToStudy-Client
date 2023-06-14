import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/components/title-block/TitleBlock.styles'

type TitleBlockProps = {
  img: string
  translationKey: string
  children?: React.ReactNode
  style?: SxProps
}

const TitleBlock: FC<TitleBlockProps> = ({
  img,
  translationKey,
  children,
  style
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box className='section' sx={{ ...styles.container, ...style }}>
      <Box sx={styles.info}>
        <TitleWithDescription
          description={t(`${translationKey}.description`)}
          style={styles.titleWithDescription}
          title={t(`${translationKey}.title.${userRole}`)}
        />
        {children && <Box sx={styles.form}>{children}</Box>}
      </Box>
      {!isMobile && <Box alt='icon' component='img' src={img}></Box>}
    </Box>
  )
}

export default TitleBlock
