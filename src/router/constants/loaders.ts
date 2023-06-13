import { LoaderFunctionArgs } from 'react-router-dom'
import { userService } from '~/services/user-service'
import { UserRoleEnum } from '~/types'

export const userProfileLoader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const role = new URL(request.url).searchParams.get('role') as UserRoleEnum
  return userService.getUserById(params.id ?? '', role)
}
