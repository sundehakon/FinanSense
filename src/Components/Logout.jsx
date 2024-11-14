import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return <Button onClick={() => logout({ returnTo: window.location.origin })} sx={{ fontWeight: 'bolder', fontSize: 17, '&:hover':{ color: 'black' }}} disableRipple style={{ backgroundColor: 'transparent' }} color='error'>Log out</Button>
};

export default LogoutButton;