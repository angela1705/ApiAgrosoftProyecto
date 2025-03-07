import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  rol: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
    
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
      const accessToken = data.access;
      console.log('Access Token recibido:', accessToken); 

     
      localStorage.setItem('access_token', accessToken);
      setAuthenticated(true);

     
      localStorage.setItem('refresh_token', data.refresh);

      
      const userResponse = await fetch('http://127.0.0.1:8000/usuarios/me/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json',
        },
      });

      if (!userResponse.ok) {
        const userErrorData = await userResponse.json();
        console.error('Error en /usuarios/me/:', userErrorData); 
        throw new Error('Error al obtener datos del usuario');
      }

      const userData: User = await userResponse.json();
      console.log('Datos del usuario:', userData); 
      setUser(userData);

      navigate('/');
    } catch (error) {
      console.error('Error en login:', error);
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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