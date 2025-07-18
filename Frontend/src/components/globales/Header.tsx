import { useEffect } from "react";
import { Menu } from "lucide-react";
import { Box, Typography } from "@mui/material";
import UserMenu from "../usuarios/UserMenu";
import Notificacion from "./Notificacion";
import ErrorBoundary from "./ErrorBoundary";
import { useNavbar } from "../../context/NavbarContext";

export const Header: React.FC = () => {
  const { setSidebarOpen } = useNavbar();

  useEffect(() => {
    console.log("[Header] Componente montado");
    return () => console.log("[Header] Componente desmontado");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 z-40 bg-green-700 h-16 flex items-center px-4 w-full shadow-md">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-white hover:bg-green-800 rounded-full"
      >
        <Menu size={24} />
      </button>
      <div className="flex-grow" />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ErrorBoundary>
          <Notificacion />
        </ErrorBoundary>
        <Typography className="text-white text-2xl font-light hidden md:block">|</Typography>
        <UserMenu hideText={true} />
      </Box>
    </header>
  );
};