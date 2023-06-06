import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/student-home-page/find-tutor-block/find-tutor-block.styles'
import bag from '~/assets/img/student-home/bag.png'
import { translationKey } from '~/containers/student-home-page/find-tutor-block/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

const FindTutorBlock = () => {
  const [filter, setFilter] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()

  const onChange = (e) => {
    setFilter(e.target.value)
  }

  const redirect = useCallback(() => {
    return navigate(authRoutes.findOffers.path, { state: { filter } })
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
      <InputWithIcon
        fullWidth={isMobile}
        onChange={onChange}
        onKeyPress={handleEnterPress}
        placeholder={t(`${translationKey}.label`)}
        startIcon={<SearchIcon />}
        sx={styles.input}
        value={filter}
      />
      <Button
        fullWidth={isMobile}
        onClick={redirect}
        size='large'
        variant='contained'
      >
        {t(`${translationKey}.button`)}
      </Button>
    </TitleBlock>
  )
}

export default FindTutorBlock
