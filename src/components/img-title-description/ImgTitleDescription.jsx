import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const componentStyle = {
  root: { m: { xs: '100px 10px', sm: '56px', md: '80px' } },
  img: { display: 'block', margin: '0 auto' },
  wrapper: { maxWidth: '630px' },
  title: { typography: 'h5' },
  description: { typography: 'subtitle' }
}

const ImgTitleDescription = ({ img, title, description, style = componentStyle }) => {
  return (
    <Box sx={ style.root }>
      <Box alt='info' component='img' src={img} sx={style.img} />

      <TitleWithDescription
        componentStyles={ style.wrapper }
        description={ description }
        descriptionStyles={ style.description }
        title={ title }
        titleStyles={ style.title }
      />
    </Box>
  )
}

export default ImgTitleDescription
