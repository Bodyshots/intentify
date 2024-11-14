"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define types for the context value
interface AuthContextType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  get_info: (request: RequestInit) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const get_info = async (request: RequestInit) => {
    try {
      const response = await fetch('http://localhost:4000/api/user', request);
      const data = await response.json();

      if (response.ok) {
        setEmail(data.email)
        setPassword(data.password)
        setFirstName(data.firstName)
        setLastName(data.lastName)
      }
    } catch (error) {
      console.error('Error finding user info', error);
    }
  };


  return (
    <AuthContext.Provider value={{ email, password, firstName, lastName,
                                   get_info }}>
      {children}
    </AuthContext.Provider>
  );
};