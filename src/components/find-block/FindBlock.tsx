import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
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

interface FindBlockProps {
  translationKey: string
}

const FindBlock = ({ translationKey }: FindBlockProps) => {
  const [inputValue, setInputValue] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const encodedInputValue = encodeURIComponent(inputValue)
  const findOffers = `${authRoutes.findOffers.path}?search=${encodedInputValue}`

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleEnterPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
        onKeyDown={handleEnterPress}
        placeholder={t(`${translationKey}.label`)}
        startIcon={<SearchIcon />}
        sx={styles.input}
        value={inputValue}
      />
      <AppButton
        component={Link}
        fullWidth={isMobile}
        sx={styles.button}
        to={findOffers}
      >
        {t(`${translationKey}.button`)}
      </AppButton>
    </TitleBlock>
  )
}

export default FindBlock
