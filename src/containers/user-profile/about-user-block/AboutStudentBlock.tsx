import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import AboutUserBlock from '~/containers/user-profile/about-user-block/AboutUserBlock'
import { aboutStudentKeys } from '~/containers/user-profile/about-user-block/about-user-block.constants'
import { UserRoleEnum, AboutStudentData } from '~/types'

interface AboutStudentBlockProps {
  data: AboutStudentData
}

const AboutStudentBlock: FC<AboutStudentBlockProps> = ({ data }) => {
  const { t } = useTranslation()

  return (
    <AboutUserBlock
      data={data}
      itemKeys={aboutStudentKeys}
      title={t('userProfilePage.studentAbout.title')}
      userRole={UserRoleEnum.Student}
    />
  )
}

export default AboutStudentBlock
