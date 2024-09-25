import { ChatResponse } from '~/types'

const sortChatsByDate = (listOfChats: ChatResponse[]): ChatResponse[] => {
  return listOfChats.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime()
    const dateB = new Date(b.updatedAt).getTime()
    return dateB - dateA
  })
}

export const filterChats = (
  listOfChats: ChatResponse[],
  userId: string,
  search: string
): ChatResponse[] => {
  const lowerCaseSearch = search.toLocaleLowerCase()

  const sortedChats = sortChatsByDate(listOfChats)

  return sortedChats.filter((item) => {
    const otherMember = item.members.find(
      (member) => member.user._id !== userId
    )

    if (!otherMember) return false

    const { firstName, lastName } = otherMember.user
    const fullName = `${firstName} ${lastName}`.toLocaleLowerCase()

    return fullName.includes(lowerCaseSearch)
  })
}
