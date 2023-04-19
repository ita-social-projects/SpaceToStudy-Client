import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/components/title-block/TitleBlock.styles'

type TitleBlockProps = {
  img: string
  translationKey: string
  children: React.ReactNode
}

const TitleBlock: FC<TitleBlockProps> = ({ img, translationKey, children }) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()

  return (
    <Box className='section' sx={styles.container}>
      <Box sx={styles.info}>
        <TitleWithDescription
          componentStyles={styles.textWrapper}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          description={t(`${translationKey}.description`)}
          descriptionStyles={styles.description}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          title={t(`${translationKey}.title`)}
          titleStyles={styles.title}
        />
        <Box sx={styles.form}>{children}</Box>
      </Box>
      {isDesktop && <Box alt='icon' component='img' src={img}></Box>}
    </Box>
  )
}

export default TitleBlock
