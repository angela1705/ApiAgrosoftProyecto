import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/components/utils/axios"; 

export interface Rol {
  id: number;
  rol: string;
  nombre?: string;
  permisos?: string[];
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  numero_de_documento: number;
  username?: string;
  rol: Rol;
  esAdmin?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (numero_de_documento: number, password: string) => Promise<void>;
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

  const login = async (numeroDocumento: number, password: string) => {
    try {

      const response = await api.post("/auth/login/", {
        numero_documento: numeroDocumento,
        password,
      });

      const data = response.data;
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setAuthenticated(true);

      const userResponse = await api.get("/usuarios/me/", {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      const userData: User = userResponse.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (error: any) {
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      throw new Error(error.response?.data?.message || "Error en el login");
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