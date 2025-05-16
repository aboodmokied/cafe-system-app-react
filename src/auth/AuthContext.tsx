import { LoginResponse, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (email:string,password:string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if(token && user){
      setIsAuthenticated(!!token);
      setToken(token);
      setUser(user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3000/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setIsAuthenticated(true);
    setToken(response.data.token);
    setUser(user);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
 

  const logout = async () => {
    await axios.get(
      "http://localhost:3000/auth/logout",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated,
        login,
        logout,
        user
         }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
