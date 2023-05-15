import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

export default {
  title: 'LanguagesListWithIcon',
  component: LanguagesListWithIcon
}

const Template = (args) => <LanguagesListWithIcon {...args} />

export const Default = Template.bind({})

Default.args = {
  languages: ['English, Ukrainian']
}
