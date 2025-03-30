import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Rol {
  id: number;
  nombre: 'admin' | 'aprendiz';
  permisos: string[];
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username?: string;
  rol: Rol; 
  esAdmin?: boolean; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(!!localStorage.getItem("access_token"));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el login");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setAuthenticated(true);

      const userResponse = await fetch("http://127.0.0.1:8000/usuarios/me/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
          "Content-Type": "application/json",
        },
      });

      const userResponseText = await userResponse.text();
      console.log("Respuesta de /usuarios/me/:", userResponseText);
      const userData: User = JSON.parse(userResponseText);

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      console.error("Error en login:", error);
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};