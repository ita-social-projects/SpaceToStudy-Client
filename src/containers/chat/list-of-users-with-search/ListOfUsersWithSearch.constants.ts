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
    if (!isCorrectUser(item, userId)) return false

    const { firstName, lastName } = item.members[0].user
    const fullName = `${firstName} ${lastName}`
    return fullName.toLocaleLowerCase().includes(lowerCaseSearch)
  })
}
