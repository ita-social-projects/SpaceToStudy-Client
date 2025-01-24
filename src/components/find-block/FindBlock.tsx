import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import Button from '~scss-components/button/Button'
import InputField from '~scss-components/input-field/InputField'

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
      <InputField
        onChange={onChange}
        onClear={onClear}
        onKeyDown={handleEnterPress}
        placeholder={t(`${translationKey}.label`)}
        search
        sx={styles.input}
        value={inputValue}
      />
      <Button component={Link} to={findOffers}>
        {t(`${translationKey}.button`)}
      </Button>
    </TitleBlock>
  )
}

export default FindBlock
