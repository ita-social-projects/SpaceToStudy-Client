import { NotificationsActiveRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { screen, render } from '@testing-library/react'
import Badge from '~scss-components/badge/Badge'

describe('Badge Component', () => {
  it('it should be rendered with "dot" variant when "sm" is passed', () => {
    render(
      <Badge variant='sm'>
        <IconButton>
          <NotificationsActiveRounded />
        </IconButton>
      </Badge>
    )

    const dotBadge = screen.getByText('', {
      selector: '.MuiBadge-dot'
    })

    expect(dotBadge).toBeInTheDocument()
  })

  it('it should be rendered with correct badge content when "lg" is passed', () => {
    render(
      <Badge variant='lg' badgeContent={5}>
        <IconButton>
          <NotificationsActiveRounded />
        </IconButton>
      </Badge>
    )

    const badgeContent = screen.getByText('5')
    expect(badgeContent).toBeInTheDocument
  })

  it('badge content should be hidden when "isVisible" is false', () => {
    render(
      <Badge variant='lg' badgeContent={5} isVisible={false}>
        <IconButton>
          <NotificationsActiveRounded />
        </IconButton>
      </Badge>
    )

    const badgeContent = screen.queryByText('5')
    expect(badgeContent).not.toBeInTheDocument()
  })
})
