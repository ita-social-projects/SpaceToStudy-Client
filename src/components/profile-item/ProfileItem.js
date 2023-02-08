import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import CheckIcon from '@mui/icons-material/Check'

import { styles } from '~/components/profile-item/ProfileItem.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const ProfileItem = ({ item, isFilled = false }) => {
  const { isMobile } = useBreakpoints()
  const { icon, title, subtitle } = item

  return (
    <Box sx={ { position: 'relative' } }>
      <Box sx={ { ...styles.wrapper, opacity: isFilled ? 0.5 : 1 } }>
        <Box sx={ styles.information }>
          { !isMobile && (<Box sx={ styles.icon }>
            { icon }
          </Box>) }
          <Box sx={ styles.text }>
            <Typography sx={ styles.title } variant='h6'>
              { title }
            </Typography>
            <Typography sx={ styles.subtitle } variant='subtitle2'>
              { subtitle }
            </Typography>
          </Box>
        </Box>
      </Box>
      { isFilled && <CheckIcon fontSize={ isMobile ? 'small' : 'medium' } sx={ styles.checkIcon } /> }
    </Box>
  )
}

export default ProfileItem
