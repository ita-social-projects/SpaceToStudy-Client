import { FC } from 'react'
import { ProfileProvider } from '~/context/profile-context'
import { ProfileTabProps } from '~/types'
import ProfileTabInnerContainer from '~/containers/edit-profile/profile-tab/profile-tab-inner-container/ProfileTabInnerContainer'
import { getProfileContextInitialValues } from '~/utils/get-profile-context-initial-values'

const ProfileTab: FC<ProfileTabProps> = ({ user }) => {
  const initialGeneralData = getProfileContextInitialValues(user)

  return (
    <ProfileProvider initialValues={initialGeneralData}>
      <ProfileTabInnerContainer user={user} />
    </ProfileProvider>
  )
}

export default ProfileTab
