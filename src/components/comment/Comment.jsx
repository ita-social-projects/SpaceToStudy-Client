import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppRating from '~/components/app-rating/AppRating'
import { styles } from '~/components/comment/Comment.styles'

const Comment = ({ review }) => {
  const { comment, author, rating, createdAt, offer } = review
  const { firstName, lastName, photo } = author
  const { category, subject, proficiencyLevel } = offer

  const timestamp = new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const createNamePart = (value) => (
    <Typography component={ 'span' } variant='body2'>
      { value }
    </Typography>
  )

  const userName = (
    <>
      { createNamePart(firstName) }
      { createNamePart(lastName) }
    </>
  )
  const coopDetails = `${category.name} - ${subject.name} - ${proficiencyLevel}`

  return (
    <Box sx={ styles.root }>
      <ImgTitleDescription
        description={ timestamp } img={ photo } style={ styles.userInfo }
        title={ userName }
      />
      <Box sx={ styles.description }>
        <Typography sx={ styles.coopDetails }>
          { coopDetails }
        </Typography>
        <AppRating
          numberVariant={ 'small' } readOnly value={ rating }
          withBackground
        />
        <Typography sx={ styles.comment }>
          { comment }
        </Typography>
      </Box>
    </Box>
  )
}

export default Comment
