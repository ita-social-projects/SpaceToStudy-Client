import VideoBox from '~/components/video-box/VideoBox'
import videoImg from '~/assets/img/guest-home-page/videoImg.png'

export default {
  title: 'VideoBox',
  component: VideoBox,
  argTypes: {
    video: {
      type: 'string',
      description: 'Variable of the image'
    }
  }
}

const Template = (args) => <VideoBox {...args} />

export const Default = Template.bind({})

Default.args = {
  video: videoImg
}
