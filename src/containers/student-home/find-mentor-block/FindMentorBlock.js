import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import { routes } from '~/constants/routes'
import { Box, Button, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styles } from './find-mentor-block.styles'
import bag from '~/assets/img/student-home/bag.png'

const FindMentorBlock = () => {
  const [filter, setFilter] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const windowSize = useBreakpoints()

  const { findMentor } = routes
  const desktopSize = windowSize === 'desktop'
  const mobileSize = windowSize === 'mobile'

  const onChange = (e) => {
    setFilter(e.target.value)
  }

  const redirect = useCallback(() => {
    return navigate(findMentor.route, { state: { filter } })
  }, [filter, findMentor.route, navigate])

  const handleEnterPress = useCallback((e) => {
    if (e.key === 'Enter' && filter) {
      redirect()
    }
  },[filter, redirect])

  useEffect(() => {
    window.addEventListener('keydown', handleEnterPress)

    return () => {
      window.removeEventListener('keydown', handleEnterPress)
    }
  }, [handleEnterPress])

  return (
    <Box className="section" sx={ styles.container }>
      <Box sx={ styles.info }>
        <Typography color='primary.900' mb={ 1 } variant="h4">
          { t('studentHome.findMentorBlock.title') }
        </Typography>
        <Typography color='primary.900' mb={ 6 } variant="subtitle1">
          { t('studentHome.findMentorBlock.description') }
        </Typography>
        <Box sx={ styles.form }>
          <TextField
            InputProps={ {
              endAdornment: <SearchIcon onClick={ redirect } position="end" />,
              autoComplete: 'off'
            } }
            fullWidth={ mobileSize }
            label={ t('studentHome.findMentorBlock.label') }
            onChange={ onChange }
            sx={ styles.input }
            value={ filter }
          />
          <Button
            fullWidth={ mobileSize }
            onClick={ redirect }
            size="extraLarge"
            variant="contained"
          >
            { t('studentHome.findMentorBlock.button') }
          </Button>
        </Box>
      </Box>
      { desktopSize && <Box alt='Bag' component="img" src={ bag }></Box> }
    </Box>
  )
}

export default FindMentorBlock
