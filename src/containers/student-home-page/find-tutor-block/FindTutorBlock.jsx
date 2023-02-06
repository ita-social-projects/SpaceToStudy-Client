import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

import { studentRoutes } from '~/router/constants/studentRoutes'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/student-home-page/find-tutor-block/find-tutor-block.styles'
import bag from '~/assets/img/student-home/bag.png'

const FindTutorBlock = () => {
  const [filter, setFilter] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isDesktop, isMobile } = useBreakpoints()

  const { findTutor } = studentRoutes

  const onChange = (e) => {
    setFilter(e.target.value)
  }

  const redirect = useCallback(() => {
    return navigate(findTutor.route, { state: { filter } })
  }, [filter, findTutor.route, navigate])

  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && filter) {
        redirect()
      }
    },
    [filter, redirect]
  )

  return (
    <Box className='section' sx={ styles.container }>
      <Box sx={ styles.info }>
        <Typography color='primary.900' mb={ 1 } variant='h4'>
          { t('studentHomePage.findTutorBlock.title') }
        </Typography>
        <Typography color='primary.900' mb={ 6 } variant='subtitle1'>
          { t('studentHomePage.findTutorBlock.description') }
        </Typography>
        <Box sx={ styles.form }>
          <TextField
            InputProps={ {
              endAdornment: (
                <IconButton onClick={ redirect }>
                  <SearchIcon position='end' />
                </IconButton>
              ),
              autoComplete: 'off'
            } }
            fullWidth={ isMobile }
            label={ t('studentHomePage.findTutorBlock.label') }
            onChange={ onChange }
            onKeyPress={ handleEnterPress }
            sx={ styles.input }
            value={ filter }
          />
          <Button
            fullWidth={ isMobile } onClick={ redirect } size='extraLarge'
            variant='contained'
          >
            { t('studentHomePage.findTutorBlock.button') }
          </Button>
        </Box>
      </Box>
      { isDesktop && <Box alt='Bag' component='img' src={ bag }></Box> }
    </Box>
  )
}

export default FindTutorBlock
