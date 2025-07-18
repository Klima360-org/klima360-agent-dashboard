import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmer } from '@/types';

interface DataContextType {
  farmers: Farmer[];
  addFarmer: (farmer: Farmer) => void;
  updateFarmer: (id: string, updates: Partial<Farmer>) => void;
  getFarmersByAgent: (agentId: string) => Farmer[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  useEffect(() => {
    // Load farmers from localStorage on app start
    const storedFarmers = localStorage.getItem('klima360_farmers');
    if (storedFarmers) {
      setFarmers(JSON.parse(storedFarmers));
    }
  }, []);

  const addFarmer = (farmer: Farmer) => {
    const updatedFarmers = [...farmers, farmer];
    setFarmers(updatedFarmers);
    localStorage.setItem('klima360_farmers', JSON.stringify(updatedFarmers));
  };

  const updateFarmer = (id: string, updates: Partial<Farmer>) => {
    const updatedFarmers = farmers.map(farmer => 
      farmer.id === id ? { ...farmer, ...updates } : farmer
    );
    setFarmers(updatedFarmers);
    localStorage.setItem('klima360_farmers', JSON.stringify(updatedFarmers));
  };

  const getFarmersByAgent = (agentId: string) => {
    return farmers.filter(farmer => farmer.agentId === agentId);
  };

  return (
    <DataContext.Provider value={{ farmers, addFarmer, updateFarmer, getFarmersByAgent }}>
      {children}
    </DataContext.Provider>
  );
};