import { useTranslation } from 'react-i18next'
import './Home.css'
import Logo from 'modules/logo/Logo'

const Home = () => {
  const { t } = useTranslation()
    
  return (
    <div className="Home">
      <Logo />
      { t('common.title') }
    </div>
  )
}

export default Home
