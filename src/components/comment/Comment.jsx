import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppRating from '~/components/app-rating/AppRating'
import { styles } from '~/components/comment/Comment.styles'

const Comment = ({ review }) => {
  console.log(review)
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
  const cooperationDetails = `${category.name} - ${subject.name} - ${proficiencyLevel}`

  return (
    <Box sx={ styles.root }>
      <ImgTitleDescription
        description={ timestamp } img={ photo } style={ styles.userInfo }
        title={ userName }
      />
      <Box sx={ { textAlign: 'start', display: 'flex', flexDirection: 'column', gap: '12px' } }>
        <Typography sx={ { color: 'primary.500',typography:{ xs:'subtitle2',sm:'button' } } }>
          { cooperationDetails }
        </Typography>
        <AppRating
          readOnly smallNumber value={ rating }
          withBackground
        />
        <Typography sx={ { typography:{ xs:'caption',sm:'body1' } } }>
          { comment }
        </Typography>
      </Box>
    </Box>
  )
}

export default Comment
