import { ChatResponse } from '~/types'

export const isCorrectUser = (item: ChatResponse, userId: string): boolean => {
  const correctUser = item.members.filter(
    (member) => member.user._id !== userId
  )
  return correctUser.length > 0
}

const sortChatsByDate = (listOfChats: ChatResponse[]): ChatResponse[] => {
  return listOfChats.sort((a, b) => {
    const dateA = new Date(a.latestMessage.createdAt).getTime()
    const dateB = new Date(b.latestMessage.createdAt).getTime()
    return dateB - dateA
  })
}

export const filterChats = (
  listOfChats: ChatResponse[],
  userId: string,
  search: string
): ChatResponse[] => {
  const sortedChats = sortChatsByDate(listOfChats)
  const lowerCaseSearch = search.toLocaleLowerCase()
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
