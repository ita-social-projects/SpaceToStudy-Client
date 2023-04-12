import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/clickable-card/ClickableCard.styles'

const ClickableCard = ({ img, title, description, action }) => {
  return (
    <Box data-testid='clickable-card' onClick={action} sx={styles.card}>
      <Box alt='item image' component='img' src={img} sx={{ mr: '24px' }} />
      <TitleWithDescription
        componentStyles={{ margin: '0px', mb: '0px', textAlign: 'start' }}
        description={description}
        descriptionStyles={{
          typography: { xs: 'body2' },
          color: 'primary.500'
        }}
        title={title}
        titleStyles={{ m: '0', typography: { xs: 'h6' } }}
      />
    </Box>
  )
}

export default ClickableCard
