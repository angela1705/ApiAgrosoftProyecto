import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import UserMenu from '../usuarios/UserMenu';
import Notificacion from "./Notificacion";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen }) => { 
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Calcular estilos dinámicamente
  const getHeaderStyles = () => {
    if (isMobile) {
      return {
        marginLeft: "0",
        width: "100%",
        paddingLeft: isSidebarOpen ? "1rem" : "4.5rem" // Ajuste para el botón de hamburguesa
      };
    } else {
      return {
        marginLeft: isSidebarOpen ? "250px" : "70px",
        width: isSidebarOpen ? "calc(100% - 250px)" : "calc(100% - 70px)"
      };
    }
  };

  return (
    <header
      className="fixed top-0 left-0 z-40 bg-green-600 h-16 flex items-center px-4 transition-all duration-300" // z-40 se mantiene
      style={getHeaderStyles()}
    >
     
    


      {/* Espacio flexible para empujar el UserMenu a la derecha */}
      <div className="flex-grow" />

      {/* Menú de usuario en la derecha */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Notificacion />
        <UserMenu />
      </Box>
    </header>
  );
};