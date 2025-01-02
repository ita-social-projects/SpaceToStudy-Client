import { render, screen } from '@testing-library/react';
import UserAvatar from '~scss-components/user-avatar/UserAvatar';

const firstName = 'John';
const lastName = 'Doe';
const avatarSrc = '/src/assets/img/user-profile-page/avatar.png';
const isOnline = true;

describe('UserAvatar Component', () => {
  it('should render with monogram variant', () => {
    render(
      <UserAvatar
        variant="monogram"
        firstName={firstName}
        lastName={lastName}
        isOnline={isOnline}
      />
    );

    const monogramElement = screen.getByText(firstName.charAt(0) + lastName.charAt(0));
    expect(monogramElement).toBeInTheDocument();
  });

  it('should show online status indicator when isOnline is true', () => {
    render(
      <UserAvatar
        variant="photo"
        firstName={firstName}
        lastName={lastName}
        isOnline={true}
        src={avatarSrc}
      />
    );

    const onlineStatus = document.querySelector('.s2s-user-avatar-status');
    expect(onlineStatus).toBeInTheDocument();
  });

  it('should not show online status indicator when isOnline is false', () => {
    render(
      <UserAvatar
        variant="photo"
        firstName={firstName}
        lastName={lastName}
        isOnline={false}
        src={avatarSrc}
      />
    );

    const onlineStatus = document.querySelector('.s2s-user-avatar-status');
    expect(onlineStatus).not.toBeInTheDocument();
  });

  it('should trigger onClick callback when clicked', () => {
    const handleClick = vi.fn();
    
    render(
      <UserAvatar
        variant="avatar"
        firstName={firstName}
        lastName={lastName}
        onClick={handleClick}
      />
    );
  
    const avatarElement =  document.querySelector('.s2s-avatar'); 
    avatarElement.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
});
