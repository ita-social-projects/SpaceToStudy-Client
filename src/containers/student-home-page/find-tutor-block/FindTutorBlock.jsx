import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import UpperBlock from '~/components/upper-block/UpperBlock'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import { studentRoutes } from '~/router/constants/studentRoutes'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/student-home-page/find-tutor-block/find-tutor-block.styles'
import bag from '~/assets/img/student-home/bag.png'
import { translationKey } from '~/containers/student-home-page/find-tutor-block/constants' 

const FindTutorBlock = () => {
  const [filter, setFilter] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()

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
    <UpperBlock img={ bag } translationKey={ translationKey } >
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
        label={ t(`${translationKey}.label`) }
        onChange={ onChange }
        onKeyPress={ handleEnterPress }
        sx={ styles.input }
        value={ filter }
      />
      <Button
        fullWidth={ isMobile } onClick={ redirect } size='extraLarge'
        variant='contained'
      >
        { t(`${translationKey}.button`) }
      </Button>
    </UpperBlock>
    
  )
}

export default FindTutorBlock
