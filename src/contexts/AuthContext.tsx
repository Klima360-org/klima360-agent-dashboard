import React, { createContext, useContext, useState, useEffect } from 'react';
import { Agent } from '@/types';

interface AuthContextType {
  agent: Agent | null;
  login: (agent: Agent) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    // Load agent from localStorage on app start
    const storedAgent = localStorage.getItem('klima360_agent');
    if (storedAgent) {
      setAgent(JSON.parse(storedAgent));
    }
  }, []);

  const login = (agentData: Agent) => {
    setAgent(agentData);
    localStorage.setItem('klima360_agent', JSON.stringify(agentData));
  };

  const logout = () => {
    setAgent(null);
    localStorage.removeItem('klima360_agent');
  };

  const isAuthenticated = !!agent;

  return (
    <AuthContext.Provider value={{ agent, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};