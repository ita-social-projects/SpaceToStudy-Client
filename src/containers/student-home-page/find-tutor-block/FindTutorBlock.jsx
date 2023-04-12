import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/student-home-page/find-tutor-block/find-tutor-block.styles'
import bag from '~/assets/img/student-home/bag.png'
import { translationKey } from '~/containers/student-home-page/find-tutor-block/constants'
import { guestRoutes } from '~/router/constants/guestRoutes'

const FindTutorBlock = () => {
  const [filter, setFilter] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()

  const onChange = (e) => {
    setFilter(e.target.value)
  }

  const redirect = useCallback(() => {
    return navigate(guestRoutes.findOffers.path, { state: { filter } })
  }, [filter, navigate])

  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && filter) {
        redirect()
      }
    },
    [filter, redirect]
  )

  return (
    <TitleBlock img={bag} translationKey={translationKey}>
      <TextField
        InputProps={{
          endAdornment: (
            <IconButton onClick={redirect}>
              <SearchIcon position='end' />
            </IconButton>
          ),
          autoComplete: 'off'
        }}
        fullWidth={isMobile}
        label={t(`${translationKey}.label`)}
        onChange={onChange}
        onKeyPress={handleEnterPress}
        sx={styles.input}
        value={filter}
      />
      <Button
        fullWidth={isMobile}
        onClick={redirect}
        size='extraLarge'
        variant='contained'
      >
        {t(`${translationKey}.button`)}
      </Button>
    </TitleBlock>
  )
}

export default FindTutorBlock
