import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface NavbarState {
  isSidebarOpen: boolean;
  expandedItems: { [key: number]: boolean };
  navScrollPosition: number;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setExpandedItems: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setNavScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

const NavbarContext = createContext<NavbarState | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar debe usarse dentro de un NavbarProvider");
  }
  return context;
};

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    // Iniciar abierto por defecto, incluso en móviles
    
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState ? JSON.parse(savedState) : true;
  });
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [navScrollPosition, setNavScrollPosition] = useState<number>(0);

  // Sincronizar localStorage
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Resetear estados si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      setSidebarOpen(false);
      setExpandedItems({});
      setNavScrollPosition(0);
      localStorage.setItem("sidebarOpen", "false");
    }
    
  }, [isAuthenticated]);

  // Opcional: Manejar redimensionamiento para cerrar en móviles
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && isSidebarOpen && isAuthenticated) {
        // Descomentar si deseas cerrar el sidebar en móviles al redimensionar
        // setSidebarOpen(false);
        // localStorage.setItem("sidebarOpen", "false");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, isAuthenticated]);

  return (
    <NavbarContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        expandedItems,
        setExpandedItems,
        navScrollPosition,
        setNavScrollPosition,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};