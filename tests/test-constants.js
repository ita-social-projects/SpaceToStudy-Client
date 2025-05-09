export const getCooperationByIdMockResponse = {
  _id: '672fd85a48371231a70da39f',
  price: 500,
  proficiencyLevel: ['Beginner'],
  status: 'waiting for approval',
  needAction: {
    role: 'tutor',
    type: 'price',
    messages: []
  },
  title: 'Cooperation title',
  initiator: {
    _id: '66fd88ddc84a281ab2f2de93',
    firstName: 'John',
    lastName: 'Doe',
    photo: '1726302583778-pexels-vanessa-garcia-6326377.jpg',
    professionalSummary: 'I have 5 years of experience',
    role: ['tutor']
  },
  receiver: {
    _id: '66b0aecdadd1fe775238c7d5',
    firstName: 'Jane',
    lastName: 'Smith',
    photo: 'receiver-photo.jpg',
    professionalSummary: 'Experienced student in web development',
    role: ['student']
  },
  offer: '66ec53d40d9d9983a9525421',
  description: 'Cooperation description',
  languages: ['English'],
  subject: { name: 'Web Development' },
  category: {
    appearance: {
      icon: 'StarRoundedIcon',
      color: '#607D8B'
    }
  },
  sections: [
    {
      _id: '66ec53d40d9d9983a952543',
      title: 'Section 1',
      description: 'Content of section 1',
      resourses: []
    },
    {
      _id: '66ec53d40d9d9983a952544',
      title: 'Section 2',
      description: 'Content of section 2',
      resourses: []
    }
  ],
  user: {
    _id: '66fd88ddc84a281ab2f2de93',
    firstName: 'John',
    lastName: 'Doe',
    photo: '1726302583778-pexels-vanessa-garcia-6326377.jpg',
    professionalSummary: 'I have 5 years of experience',
    role: ['tutor']
  },
  createdAt: '2024-09-12T11:28:34.397Z',
  updatedAt: '2024-09-12T11:28:34.397Z'
}

export const mockedCooperations = {
  items: [
    {
      _id: '66ec53d40d9d9983a952541',
      title: 'Cooperation title',
      offer: '66ec53d40d9d9983a952542',
      receiver: {
        _id: '6750ca3f466f194485b1e178',
        firstName: 'Alice',
        lastName: 'Johnson',
        photo: 'alice-photo.jpg',
        professionalSummary: 'Passionate about learning',
        role: ['tutor']
      },
      receiverRole: 'tutor',
      initiator: {
        _id: '6736f6cec333d2e67f3710dc',
        firstName: 'Bob',
        lastName: 'Williams',
        photo: 'bob-photo.jpg',
        professionalSummary: 'Experienced mentor',
        role: ['student']
      },
      initiatorRole: 'student',
      subject: { name: 'Web Development' },
      category: {
        appearance: {
          icon: 'StarRoundedIcon',
          color: '#607D8B'
        }
      },
      description: 'Cooperation description',
      languages: ['English'],
      user: {
        _id: '6565f781b2b2c701e9183cb8',
        firstName: 'Jane',
        lastName: 'Doe',
        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
        professionalSummary: 'Experienced in online collaboration',
        role: ['student']
      },
      price: 1800,
      proficiencyLevel: ['Beginner'],
      status: 'pending',
      needAction: {
        role: 'student',
        type: 'price',
        messages: []
      },
      sections: [
        {
          _id: '66ec53d40d9d9983a952543',
          title: 'Section 1',
          description: 'Content of section 1',
          resourses: []
        },
        {
          _id: '66ec53d40d9d9983a952544',
          title: 'Section 2',
          description: 'Content of section 2',
          resourses: []
        }
      ],
      createdAt: '2024-09-12T11:28:34.397Z',
      updatedAt: '2024-09-12T11:28:34.397Z'
    }
  ],
  count: 1
}
