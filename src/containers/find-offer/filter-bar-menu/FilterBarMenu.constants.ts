import { CardsViewEnums } from '~/types/findOffers/enums/viewSwitcher.enums'
  
export const sortByFields = [
  {
    value: 'popularity',
    title: 'filters.sortBy.sortByFields.popularity'
  },
  {
    value: 'newest',
    title: 'filters.sortBy.sortByFields.newest'
  },
  {
    value: 'tutorRating',
    title: 'filters.sortBy.sortByFields.tutorRating'
  },
  {
    value: 'price',
    title: 'filters.sortBy.sortByFields.price'
  }
]

export const initialBarMenuFilters = {
  isActiveOffersType: false,
  sortBy: 'newest',
  view: CardsViewEnums.Inline
}
