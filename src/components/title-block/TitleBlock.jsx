import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

import { styles } from '~/components/title-block/TitleBlock.styles'
import useBreakpoints from '~/hooks/use-breakpoints'


const TitleBlock = ({ img, translationKey, children }) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()

  return (
    <Box className='section' sx={ styles.container }>
      <Box sx={ styles.info }>
        <TitleWithDescription 
          componentStyles={ styles.textWrapper }
          description={ t(`${translationKey}.description`) }
          descriptionStyles={ styles.description }
          title={ t(`${translationKey}.title`) } 
          titleStyles={ styles.title } 
        />
        <Box sx={ styles.form }>
          { children }
        </Box>
      </Box>
      { isDesktop && <Box alt='icon' component='img' src={ img }></Box> }
    </Box>
  )
}

export default TitleBlock
