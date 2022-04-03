import Logo from '~/containers/logo/Logo'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
    
  return (
    <div className="Home">
      <Logo />
      { t('common.about') }
    </div>
  )
}

export default About
