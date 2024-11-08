import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import AboutUserBlock from '~/containers/user-profile/about-user-block/AboutUserBlock'
import { UserRoleEnum, ProfessionalBlock } from '~/types'

interface AboutTutorBlockProps {
  data: ProfessionalBlock
}

const AboutTutorBlock: FC<AboutTutorBlockProps> = ({ data }) => {
  const { t } = useTranslation()

  const professionalBlockKeys = Object.keys(data)

  return (
    <AboutUserBlock
      data={data}
      itemKeys={professionalBlockKeys}
      title={t('userProfilePage.tutorAbout.title')}
      userRole={UserRoleEnum.Tutor}
    />
  )
}

export default AboutTutorBlock
