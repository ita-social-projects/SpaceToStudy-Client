import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { EditProfileForm, UpdateUserParams, UseFormErrors } from '~/types'

interface ProfileProviderProps {
  children: ReactNode
  initialValues: UpdateUserParams
}

interface ProfileData {
  generalData: ProfileGeneralData
}

interface ProfileGeneralData {
  data: UpdateUserParams
  errors?: UseFormErrors<EditProfileForm>
}

interface ProfileContext {
  profileData: ProfileData
  handleProfileData: (
    data: UpdateUserParams,
    errors?: UseFormErrors<EditProfileForm>
  ) => void
}

const ProfileContext = createContext<ProfileContext>({} as ProfileContext)

const ProfileProvider = ({ children, initialValues }: ProfileProviderProps) => {
  const [generalData, setGeneralData] = useState<ProfileGeneralData>({
    data: initialValues
  })

  const profileData = {
    generalData: generalData
  }

  const handleProfileData = useCallback(
    (data: UpdateUserParams, errors?: UseFormErrors<EditProfileForm>) => {
      setGeneralData((prev) => ({
        data: { ...prev.data, ...data },
        errors
      }))
    },
    []
  )

  return (
    <ProfileContext.Provider value={{ profileData, handleProfileData }}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfileContext = () => useContext(ProfileContext)

export { ProfileProvider, useProfileContext }
