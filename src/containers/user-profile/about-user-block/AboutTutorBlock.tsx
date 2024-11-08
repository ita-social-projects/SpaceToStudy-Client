import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import AboutUserBlock from '~/containers/user-profile/about-user-block/AboutUserBlock'
import { aboutTutorKeys } from '~/containers/user-profile/about-user-block/about-user-block.constants'
import { UserRoleEnum, ProfessionalBlock } from '~/types'

interface AboutTutorBlockProps {
  data: ProfessionalBlock
}

const AboutTutorBlock: FC<AboutTutorBlockProps> = ({ data }) => {
  const { t } = useTranslation()

  return (
    <AboutUserBlock
      data={data}
      itemKeys={aboutTutorKeys}
      title={t('userProfilePage.tutorAbout.title')}
      userRole={UserRoleEnum.Tutor}
    />
  )
}

export default AboutTutorBlock
