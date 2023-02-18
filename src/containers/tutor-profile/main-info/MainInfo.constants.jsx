import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/containers/tutor-profile/main-info/MainInfo.styles'

const accountRating = (
  <>
    <StarIcon sx={ styles.ratingIcon } />
    { '5' }
  </>
)

const linkToReviews = (
  <Typography
    component={ HashLink } sx={ { color: 'text.primary' } } to={ '#' }
    variant='overline'
  >
    { '23 reviews' }
  </Typography>
)

export const accountInfo = [
  {
    title: '3 years',
    description: 'at space2study'
  },
  {
    title: accountRating,
    description: linkToReviews
  },
  {
    title: '75 UAH',
    description: 'hourly rate'
  }
]

export const subjectChips = ['German', 'English', 'JavaScript', 'Computer Science', '3D Modeling', 'Design']

export const doneItems = [
  { title: '251', description: 'lessons' },
  { title: 'Native: ', description: 'English' },
  { title: 'Responds in', description: '5 hours' },
  { title: 'Based in', description: 'Lviv, Ukraine' }
]
