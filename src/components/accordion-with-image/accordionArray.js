import MapLogo from '~/img/guest-home-page/map.svg'
import WorldLogo from '~/img/guest-home-page/world.jpg'
const accordionArray = [ 
  {
    image: MapLogo,
    id: 'panel1',
    heading:'accordion.flexibleLocation.heading', 
    subHeading:'accordion.flexibleLocation.subHeading',
  },
  {
    image: WorldLogo,
    id: 'panel2',
    heading:'accordion.individualTime.heading', 
    subHeading:'accordion.individualTime.subHeading',
  },
  {
    image: MapLogo,
    id: 'panel3',
    heading:'accordion.freeChoiceOfTeachers.heading', 
    subHeading:'accordion.freeChoiceOfTeachers.subHeading',
  },
  {
    image: WorldLogo,
    id: 'panel4',
    heading:'accordion.digitalCommunication.heading', 
    subHeading:'accordion.digitalCommunication.subHeading',
  }
]
export default accordionArray
