import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/user/${userId}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserDetails(decoded.id);
    }
  }, [token]);

  const signup = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const login = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    // After setting token fetch user details
    const decoded = jwtDecode(userToken);
    fetchUserDetails(decoded.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
