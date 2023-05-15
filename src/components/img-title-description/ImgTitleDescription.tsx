import { FC } from 'react'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { SxProps } from '@mui/system'
import Avatar from '@mui/material/Avatar'

import { styles } from '~/components/img-title-description/ImgTitleDescription.styles'

interface ImgTitleDescriptionProps {
  component?: string
  img?: string
  title: string
  description?: string
  style?: {
    [key: string]: SxProps
  }
}

const ImgTitleDescription: FC<ImgTitleDescriptionProps> = ({
  component,
  img,
  title,
  description,
  style = styles
}) => {
  return (
    <Box sx={style.root}>
      {component === 'avatar' ? (
        <Avatar src={img} sx={style.img} />
      ) : (
        <Box alt='info' component='img' src={img} sx={style.img} />
      )}

      <TitleWithDescription
        description={description}
        style={style.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default ImgTitleDescription
