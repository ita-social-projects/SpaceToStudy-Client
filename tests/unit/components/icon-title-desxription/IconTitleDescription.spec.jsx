import { render, screen } from '@testing-library/react'
import DoneIcon from '@mui/icons-material/Done'

import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'

describe('IconTitleDescription test', () => {
  beforeEach(() => {
    render(
      <IconTitleDescription
        description='description'
        icon={<DoneIcon />}
        title='title'
      />
    )
  })

  it('should render icon with title', () => {
    const doneIcon = screen.getByTestId('DoneIcon')
    const title = screen.getByText('title')

    expect(title).toBeInTheDocument()
    expect(doneIcon).toBeInTheDocument()
  })
})
