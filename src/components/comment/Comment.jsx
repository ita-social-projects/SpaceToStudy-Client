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

  const userName = (
    <>
      <Typography component={ 'span' } variant='body2'>
        { firstName }
      </Typography>
      <Typography component={ 'span' } variant='body2'>
        { lastName }
      </Typography>
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
          numberVariant={ 'small' } 
          readOnly 
          sx={ styles.rating }
          value={ rating }
        />
        <Typography sx={ styles.comment }>
          { comment }
        </Typography>
      </Box>
    </Box>
  )
}

export default Comment
