import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthentication: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthentication, setAuthentication] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    setAuthentication(true);

    // Obtener los datos del usuario desde la API
    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }

      const userData: User = await response.json();
      setUser(userData); // Almacenar los datos del usuario
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      setUser(null); // En caso de error, establecer el usuario como null
    }

    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthentication(false);
    setUser(null); // Limpiar los datos del usuario al cerrar sesión
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthentication, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};