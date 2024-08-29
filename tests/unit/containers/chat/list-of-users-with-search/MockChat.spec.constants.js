export const chatsMock = [
  {
    _id: '64aec471990d5985c11b6e4c',
    members: [
      {
        user: {
          _id: '644e6b1668cc37f543f2f37c',
          firstName: 'Albus',
          lastName: 'Dumbledore'
        },
        role: 'student'
      },
      {
        user: {
          _id: '644e6b1668cc37f543f2f37c',
          firstName: 'Alaya',
          lastName: 'McKenzie',
          photo: '1687365545877-1366_2000.jpeg'
        },
        role: 'student'
      }
    ],
    latestMessage: {
      _id: '64aed812990d5985c02b6e8a',
      author: {
        _id: '644e6b1668cc37f543f2f37c',
        firstName: 'Alaya',
        lastName: 'McKenzie',
        photo: '1687365545877-1366_2000.jpeg'
      },
      authorRole: 'tutor',
      text: 'Wrong!',
      chat: '64aec471990d5985c11b6e4c',
      createdAt: '2023-07-18T10:42:58.436Z',
      updatedAt: '2023-07-18T06:42:58.436Z'
    },
    createdAt: '2023-07-18T10:19:13.343Z',
    updatedAt: '2023-07-18T10:42:58.472Z'
  },
  {
    _id: '55aec471990d5985c02b6e4c',
    members: [
      {
        user: {
          _id: '644e6b1668cc37f543f2f37c',
          firstName: 'Scott',
          lastName: 'Short',
          photo: '1687365545877-1366_2000.jpeg'
        },
        role: 'student'
      },
      {
        user: {
          _id: '6477007a6fa4d05e1a800ce5',
          firstName: 'Yura',
          lastName: 'Didenko',
          photo: '1687365545877-1366_2000.jpeg'
        },
        role: 'student'
      }
    ],
    latestMessage: {
      _id: '64aed812990d5985c02b6e8a',
      author: {
        _id: '6477007a6fa4d05e1a800ce5',
        firstName: 'Yura',
        lastName: 'Didenko',
        photo: '1687365545877-1366_2000.jpeg'
      },
      authorRole: 'tutor',
      text: 'Hi!',
      chat: '55aec471990d5985c02b6e4c',
      createdAt: '2023-07-12T16:42:58.436Z',
      updatedAt: '2023-07-12T16:42:58.436Z'
    },
    createdAt: '2023-07-12T15:19:13.343Z',
    updatedAt: '2023-07-12T16:42:58.472Z'
  }
]

export const messagesMock = {
  items: [
    {
      _id: '64a28e8c5d56f749c7d915d0',
      author: {
        _id: '644e6b1668cc37f543f2f37c',
        photo: '1687425744398-ITA wallpapers-19.png'
      },
      authorRole: 'student',
      text: 'Some text',
      isRead: false,
      isNotified: false,
      chat: '64aec471990d5985c11b6e4c',
      createdAt: '2023-20-01T13:25:36.292Z',
      updatedAt: '2023-20-01T13:25:36.292Z'
    }
  ],
  count: 1
}
