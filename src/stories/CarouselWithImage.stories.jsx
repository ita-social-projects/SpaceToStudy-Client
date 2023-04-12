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
      title: 'Flexible Location',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      image: MapLogo,
      title: 'Individual Time',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      image: MapLogo,
      title: 'Free Choice of Teachers',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      image: MapLogo,
      title: 'Digital Communication',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    }
  ]
}
