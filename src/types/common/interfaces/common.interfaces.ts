export interface UserInterface {
    firstName: string
    lastName: string
    photo?: string
  }

export interface CategoryInterface {
    name: string
  }

export interface SubjectInterface {
    name: string
  }


export interface OfferInterface  {
    category: CategoryInterface
    subject: SubjectInterface
    proficiencyLevel: string
  }

export interface ReviewInterface  {
    offer: OfferInterface
    author: UserInterface
    comment: string
    rating: number
    createdAt: string
  }
