import { userService } from '~/services/user-service'
import useMutation from '~/hooks/use-mutation'
import { UseAxiosProps } from '~/hooks/use-axios'

export const useToggleBookmark = (
  userId: string,
  onResponse: UseAxiosProps<string[], string>['onResponse'],
  onResponseError: UseAxiosProps<string[], string>['onResponseError']
) => {
  const { mutate: toggleBookmark } = useMutation({
    mutationFn: (offerID: string) =>
      userService.toggleBookmark(userId, offerID),
    onSuccess: (response) => onResponse?.(response),
    onError: (error) => onResponseError?.(error)
  })

  return toggleBookmark
}
