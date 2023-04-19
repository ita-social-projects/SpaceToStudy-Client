import { FC } from 'react'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { SxProps } from '@mui/system'

import { styles } from '~/components/img-title-description/ImgTitleDescription.styles'

interface ImgTitleDescriptionProps {
  img?: string
  title: string
  description: string
  style?: {
    [key: string]: SxProps
  }
}

const ImgTitleDescription: FC<ImgTitleDescriptionProps> = ({
  img,
  title,
  description,
  style = styles
}) => {
  return (
    <Box sx={style.root}>
      <Box alt='info' component='img' src={img} sx={style.img} />

      <TitleWithDescription
        componentStyles={style.wrapper}
        description={description}
        descriptionStyles={style.description}
        title={title}
        titleStyles={style.title}
      />
    </Box>
  )
}

export default ImgTitleDescription
