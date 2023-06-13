import { useCallback } from 'react'

import { userService } from '~/services/user-service'

import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'

const useUserInfo = ({ fetchOnMount = true, id, role } = {}) => {
  const getUserData = useCallback(
    () => userService.getUserById(id, role),
    [id, role]
  )

  const { loading, response, fetchData, error } = useAxios({
    service: getUserData,
    fetchOnMount,
    defaultResponse: defaultResponses.array
  })

  return { loading, response, fetchData, error }
}

export default useUserInfo
