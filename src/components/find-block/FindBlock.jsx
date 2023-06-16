import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'

import useBreakpoints from '~/hooks/use-breakpoints'
import TitleBlock from '~/components/title-block/TitleBlock'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButton from '~/components/app-button/AppButton'

import bag from '~/assets/img/student-home/bag.png'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/find-block/find-block.styles'

const FindBlock = ({ translationKey }) => {
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
        navigate(findOffers)
      }
    },
    [inputValue, navigate, findOffers]
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

export default FindBlock
