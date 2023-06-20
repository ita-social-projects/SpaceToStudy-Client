import { LoaderFunctionArgs, defer } from 'react-router-dom'
import { userService } from '~/services/user-service'
import { UserRoleEnum } from '~/types'

export const userProfileLoader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const role = new URL(request.url).searchParams.get('role') as UserRoleEnum
  const result = await userService.getUserById(params.id ?? '', role)
  return defer({ data: result.data })
}
