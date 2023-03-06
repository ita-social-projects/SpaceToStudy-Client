import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/title-block/TitleBlock.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const TitleBlock = ({ img, translationKey, children }) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()

  return (
    <Box className='section' sx={ styles.container }>
      <Box sx={ styles.info }>
        <Typography sx={ styles.title } variant='h4'>
          { t(`${translationKey}.title`) }
        </Typography>
        <Typography sx={ styles.description } variant='subtitle1'>
          { t(`${translationKey}.description`) }
        </Typography>
        <Box sx={ styles.form }>
          { children }
        </Box>
      </Box>
      { isDesktop && <Box alt='icon' component='img' src={ img }></Box> }
    </Box>
  )
}

export default TitleBlock
