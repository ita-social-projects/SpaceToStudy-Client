import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/img-title-description/ImgTitleDescription.styles'

const ImgTitleDescription = ({ img, title, description, style = styles }) => {
  return (
    <Box sx={style.root}>
      <Box alt='info' component={'img'} src={img} sx={style.img} />

      <TitleWithDescription
        description={description}
        style={style.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default ImgTitleDescription
