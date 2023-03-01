import { commonShadow } from '~/styles/app-theme/custom-shadows'

import { blueGrey, green } from '@mui/material/colors'

export const styles = {
  container: {
    display: 'flex',
    padding: '30px 20px',
    boxShadow: commonShadow
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mr: '20px'
  },
  avatar: {
    height: '80px',
    width: '80px',
    mb: '16px'
  },
  ratingContainer: {
    display: 'flex',
    borderRadius: '8px',
    padding: '6px',
    backgroundColor: 'basic.grey'
  },
  rating: {
    mr: '5px'
  },
  bio: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    lineClamp: 2,
    WebkitBoxOrient: 'vertical',
    boxOrient: 'vertical',
    overflow: 'hidden',
    mb: '10px'
  },
  chipsContainer: {
    display: 'flex',
    mb: '10px'
  },
  subjectChip: {
    mr: '4px',
    backgroundColor: green[300]
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    lineClamp: 4,
    WebkitBoxOrient: 'vertical',
    boxOrient: 'vertical',
    overflow: 'hidden',
    color: 'primary.600',
    mb: '10px'
  },
  languagesContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  languageIcon: {
    color: blueGrey[400],
    marginRight: '8px'
  },
  languages: {
    color: 'primary.400'
  },
  middleContainer: {
    mr: '50px'
  },
  rightContainer: {
    minWidth: '166px'
  },
  rightContainerTop: {
    position: 'relative',
    mb: '30px'
  },
  bookmarkButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  sendMessageButton: {
    width: '100%',
    mb: '16px'
  },
  viewProfileButton: {
    width: '100%',
    backgroundColor: 'primary.50',
    color: 'primary.900',
    '&:hover': {
      backgroundColor: 'primary.50'
    }
  }
}
