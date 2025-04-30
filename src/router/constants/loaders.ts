import { LoaderFunctionArgs } from 'react-router-dom'
import { userService } from '~/services/user-service'
import { UserRoleEnum } from '~/types'
import { queryClient } from '~/plugins/queryClient'

export const userProfileLoader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const role = new URL(request.url).searchParams.get('role') as UserRoleEnum
  await queryClient.prefetchQuery({
    queryKey: ['user', params.id, role],
    queryFn: () =>
      userService.getUserByIdWithBaseService(params.id ?? '', role),
    staleTime: Infinity
  })

  return {
    _id: params.id,
    role
  }
}
