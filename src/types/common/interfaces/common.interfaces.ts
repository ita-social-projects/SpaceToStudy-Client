export interface UserInterface {
  firstName: string
  lastName: string
  photo?: string
}

export interface CategoryInterface {
  _id: string
  name: string
  totalOffers: number
  categoryIcon: string
  createdAt: string
  updatedAt: string
  }

export interface SubjectInterface {
  name: string
}

export interface OfferInterface  {
    category: Pick<CategoryInterface, '_id' | 'name'>
    subject: SubjectInterface
    proficiencyLevel: string
  }

export interface ReviewInterface {
  offer: OfferInterface
  author: UserInterface
  comment: string
  rating: number
  createdAt: string
}
