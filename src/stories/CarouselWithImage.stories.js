import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'

export default {
    title: 'CarouselWithImage',
    component: CarouselWithImage,
    argTypes: {
      items: {
        type: 'array',
        description: 'Array of CarouselWithImage items to show'
      }
    }
  }

const Template = (args) => <CarouselWithImage {...args} />

export const Default = Template.bind({})

Default.args = {
    items: [
      {
        image: MapLogo,
        title: 'Title 1',
        description: 'Description 1'
      },
      {
        image: MapLogo,
        title: 'Title 2',
        description: 'Description 2'
      },
      {
        image: MapLogo,
        title: 'Title 3',
        description: 'Description 3'
      },
      {
        image: MapLogo,
        title: 'Title 4',
        description: 'Description 4'
      },
    ]
  }
