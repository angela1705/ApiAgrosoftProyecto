import React from "react";
import { IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

interface UserMenuProps {
  hideText?: boolean;  
}

const UserMenu: React.FC<UserMenuProps> = ({ hideText }) => {
  const { logout, user } = useAuth();
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

  return (
    <Box>
      <IconButton  sx={{ ml: 1, color: "#fff" }} onClick={handleClick}>
        <AccountCircleIcon />
        {!hideText && (
          <Typography  sx={{ ml: 1, color: "#fff" }} variant="body1">
            {user ? user.nombre : "Usuario"}
          </Typography>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="subtitle1">
              {user ? `${user.nombre} ${user.apellido}` : "Usuario"}
            </Typography>
            <Typography  color="textSecondary" variant="body1">
              {user ? user.email : "correo@ejemplo.com"}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem component={Link} to="/perfil" onClick={handleClose}>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;