import { useTranslation } from 'react-i18next'

import AboutUserBlock from '~/containers/user-profile/about-user-block/AboutUserBlock'

const AboutTutorBlock = ({ data }) => {
  const { t } = useTranslation()
  const professionalBlockKeys = Object.keys(data)

  return (
    <AboutUserBlock
      data={data}
      itemKeys={professionalBlockKeys}
      title={t('userProfilePage.aboutTutor.title')}
      userRole='Tutor'
    />
  )
}

export default AboutTutorBlock
