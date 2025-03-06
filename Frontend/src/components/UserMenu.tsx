import React from 'react';
import { useAuth } from '../context/AuthContext';
import { IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu: React.FC = () => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  // Aquí se pone la API.
  // Por ahora, usaré datos ficticios.
  const user = {
    name: 'Usuario',
    edad: '21',
    email: 'steventu06@gmail.com',


  };

  return (
    <Box>
      <IconButton onClick={handleClick}sx={{ ml: 1,color: '#fff' }} >
        
        <AccountCircleIcon />
        <Typography variant="body1" sx={{ ml: 1,color: '#fff' }} >
          {user.name}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="subtitle1">{user.name}</Typography>
            <Typography variant="body1" color="warning">
              {user.email}
            </Typography>
            
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} >Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;