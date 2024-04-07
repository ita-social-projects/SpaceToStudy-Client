import { FC } from 'react'
import { ProfileProvider } from '~/context/profile-context'
import { ProfileTabProps } from '~/types'
import ProfileTabInnerContainer from '~/containers/edit-profile/profile-tab/profile-tab-inner-container/ProfileTabInnerContainer'
import { getInitialValues } from '~/containers/edit-profile/profile-tab/ProfileTab.constants'

const ProfileTab: FC<ProfileTabProps> = ({ user }) => {
  const initialGeneralData = getInitialValues(user)

  return (
    <ProfileProvider initialValues={initialGeneralData}>
      <ProfileTabInnerContainer user={user} />
    </ProfileProvider>
  )
}

export default ProfileTab
