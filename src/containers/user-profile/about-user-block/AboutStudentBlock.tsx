import { useTranslation } from 'react-i18next'

import AboutUserBlock from '~/containers/user-profile/about-user-block/AboutUserBlock'
import {
  aboutStudentKeys,
  aboutStudentData
} from '~/containers/user-profile/about-user-block/about-user-block.constants'
import { UserRoleEnum } from '~/types'

const AboutStudentBlock = () => {
  const { t } = useTranslation()

  return (
    <AboutUserBlock
      data={aboutStudentData}
      itemKeys={aboutStudentKeys}
      title={t('userProfilePage.studentAbout.title')}
      userRole={UserRoleEnum.Student}
    />
  )
}

export default AboutStudentBlock
