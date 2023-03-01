import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/upper-block/UpperBlock.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const UpperBlock = ({ img, path, children }) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()

  return (
    <Box className='section' sx={ styles.container }>
      <Box sx={ styles.info }>
        <Typography color='primary.900' mb={ 1 } variant='h4'>
          { t(`${path}.title`) }
        </Typography>
        <Typography color='primary.900' mb={ 6 } variant='subtitle1'>
          { t(`${path}.description`) }
        </Typography>
        <Box sx={ styles.form }>
          { children }
        </Box>
      </Box>
      { isDesktop && <Box alt='icon' component='img' src={ img }></Box> }
    </Box>
  )
}

export default UpperBlock
