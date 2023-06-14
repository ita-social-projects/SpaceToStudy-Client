import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import TitleBlock from '~/components/title-block/TitleBlock'
import SearchIcon from '@mui/icons-material/Search'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/student-home-page/find-tutor-block/find-tutor-block.styles'
import bag from '~/assets/img/student-home/bag.png'
import { translationKey } from '~/containers/student-home-page/find-tutor-block/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButton from '~/components/app-button/AppButton'

const FindTutorBlock = () => {
  const [inputValue, setInputValue] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const findOffers = `${authRoutes.findOffers.path}?search=${inputValue}`

  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && inputValue) {
        navigate(authRoutes.findOffers.path, { state: { inputValue } })
      }
    },
    [inputValue, navigate]
  )

  const onClear = () => setInputValue('')

  return (
    <TitleBlock
      img={bag}
      style={styles.container}
      translationKey={translationKey}
    >
      <InputWithIcon
        fullWidth={isMobile}
        onChange={onChange}
        onClear={onClear}
        onKeyPress={handleEnterPress}
        placeholder={t(`${translationKey}.label`)}
        startIcon={<SearchIcon />}
        sx={styles.input}
        value={inputValue}
      />
      <AppButton component={Link} fullWidth={isMobile} to={findOffers}>
        {t(`${translationKey}.button`)}
      </AppButton>
    </TitleBlock>
  )
}

export default FindTutorBlock
