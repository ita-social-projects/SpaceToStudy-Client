import { userService } from '~/services/user-service'
import useAxios, { UseAxiosProps } from '~/hooks/use-axios'

export const useToggleBookmark = (
  userId: string,
  onResponse: UseAxiosProps<string[], string>['onResponse'],
  onResponseError: UseAxiosProps<string[], string>['onResponseError']
) => {
  const { fetchData: toggleBookmark } = useAxios<string[], string>({
    service: (offerID: string) => userService.toggleBookmark(userId, offerID),
    fetchOnMount: false,
    onResponse,
    onResponseError
  })

  return toggleBookmark
}
