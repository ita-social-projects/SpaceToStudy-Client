import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Comment from '~/components/comment/Comment'
import RatingBlock from '~/containers/tutor-profile/coments-block/rating-block/RatingBlock'
import { styles } from '~/containers/tutor-profile/coments-block/ComentsBlock.styles'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import AppButton from '~/components/app-button/AppButton'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import Loader from '~/components/loader/Loader'

const response = { 
  count:1,
  items:[{
    '_id': '6400f540307bdcc5da14aa5e',
    'comment': 'great',
    'rating': 5,
    'author': {
      '_id': '63f905d3237ccffcf95d88da',
      'role': [
        'student'
      ],
      'firstName': 'Tart',
      'lastName': 'Drilling',
      'email': 'tartdrilling@gmail.com',
      'categories': [],
      'totalReviews': 0,
      'averageRating': 3,
      'lastLogin': '2023-03-03T21:01:30.973Z',
      'createdAt': '2023-02-24T18:45:39.298Z',
      'updatedAt': '2023-03-03T21:01:30.975Z',
      '__v': 0
    },
    'targetUserId': '63f21d357a3b08831a22b257',
    'targetUserRole': 'tutor',
    'offer': {
      '_id': '640092c8c729d4db9788d9d0',
      'price': 15,
      'proficiencyLevel': 'Beginner',
      'description': 'test description',
      'languages': [
        'English'
      ],
      'authorRole': 'student',
      'userId': '63f21d357a3b08831a22b257',
      'subject': { '_id':'63da8767c9ad4c9a0b0eacd3','name':'English' },
      'category':  { '_id':'63da8767c9ad4c9a0b0eacd3','name':'Languages' },
      'createdAt': '2023-03-02T12:12:56.598Z',
      'updatedAt': '2023-03-02T12:12:56.598Z',
      '__v': 0
    },
    'createdAt': '2023-03-02T19:13:04.074Z',
    'updatedAt': '2023-03-02T19:13:04.074Z',
    '__v': 0
  }] }


const ComentsBlock = ({ userId, userRole, averageRating, totalReviews, reviewsCount }) => {
  const [filter, setFilter] = useState(null)
  const [amountToShow, setAmountToShow] = useState(4)
  const { count, items } = response
  const loading = false
  // const {
  //   loading,
  //   fetchData,
  //   response:{ body:{ count, items } }
  // } = useAxios({ service: () => userService.getUserReviews(userId, userRole) })

  const itemsList = (
    <Box sx={ { width:'100%' } }>
      { items.map((review) => (
        <Comment key={ review._id } review={ review } />
      )) }
    </Box>
  )

  const handleShowMoreComments = () => {
    setAmountToShow(prev => {
      const showCount = prev + 10
      // fetchData(showCount)
      return showCount
    })
  }

  const handleFilterChange = (value) => {
    if(value !== filter){
      setFilter(value)
    }
  }
  
  const showMoreButton =  !(count < amountToShow) && (
    <AppButton
      endIcon={ !loading && <KeyboardArrowDownSharpIcon /> } 
      loading={ loading && items.length }
      onClick={ handleShowMoreComments }
      size='large'
      sx={ { minWidth:'195px' } }
      variant='contained'
    >
      See all reviews
    </AppButton>
  ) 

  return (
    <Box sx={ styles.root }>
      <Typography sx={ styles.title }>
        What Students Say
      </Typography>
      { (loading && !items.length) ?(
        <Loader size={ 70 } />
      ):(
        <>
          <RatingBlock
            activeFilter={ filter }
            averageRating={ averageRating }
            ratings={ reviewsCount }
            reviewsAmount={ totalReviews }
            setFilter={ handleFilterChange }
          />
          { itemsList }
          { showMoreButton }
        </>) 
      }
    </Box>
  )
}

export default ComentsBlock
