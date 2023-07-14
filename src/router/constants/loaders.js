import { defer } from 'react-router-dom'
import { userService } from '~/services/user-service'

export const userProfileLoader = async ({ request, params }) => {
  const role = new URL(request.url).searchParams.get('role')
  const result = await userService.getUserById(params.id ?? '', role)
  return defer({ data: result.data })
}
