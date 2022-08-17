import { Box } from '@mui/material'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const style = {
  root: { m: { xs: '100px 10px', sm: '45px 20px 55px' } },
  img: { display: 'block', margin: '0 auto' },
  wrapper: { maxWidth: '630px' },
  title: { typography: 'h5' },
  description: { typography: 'subtitle' }
}

const ImgTitleDescription = ({ img, title, description, styles=style }) => {

  return (
    <Box sx={ styles.root }>
      <Box
        alt="info" component="img" src={ img }
        sx={ styles.img }
      />

      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ description }
        descriptionStyles={ styles.description }
        title={ title }
        titleStyles={ styles.title }
      />
    </Box>
  )
}

export default ImgTitleDescription
