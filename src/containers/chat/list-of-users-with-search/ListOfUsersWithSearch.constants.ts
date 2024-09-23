import { ChatResponse } from '~/types'

export const filterChats = (
  listOfChats: ChatResponse[],
  userId: string,
  search: string
): ChatResponse[] => {
  const lowerCaseSearch = search.toLocaleLowerCase()

  return listOfChats.filter((item) => {
    const otherMember = item.members.find(
      (member) => member.user._id !== userId
    )

    if (!otherMember) return false

    const { firstName, lastName } = otherMember.user
    const fullName = `${firstName} ${lastName}`.toLocaleLowerCase()

    return fullName.includes(lowerCaseSearch)
  })
}
