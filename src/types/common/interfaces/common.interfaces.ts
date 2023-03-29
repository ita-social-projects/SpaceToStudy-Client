export interface UserInterface {
  firstName: string
  lastName: string
  photo?: string
}

export interface CategoryInterface {
  _id: string
  name: string
  categoryIcon: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface SubjectInterface {
  _id: string
  name: string
  category: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface OfferInterface {
  category: CategoryInterface
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
