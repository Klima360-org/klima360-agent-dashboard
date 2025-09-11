export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateJoined: string;
  farmersEnrolled: number;
  farmersScored: number;
  productsMatched: number;
  lastActive: string;
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  county: string;
  subCounty?: string;
  village: string;
  gpsCoordinates?: string;
  farmSize: number;
  farmingType: 'crop' | 'livestock' | 'mixed';
  mainCrops?: string;
  dateEnrolled: string;
  agentId: string;
  agentName: string;
  climateScore?: number;
  scoreBand?: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent';
  matchedProduct?: Product;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent';
}

export interface ClimateScoreAnswers {
  // Exposure (4 questions)
  droughtFrequency: boolean;
  floodingRisk: boolean;
  temperatureExtremes: boolean;
  rainfallVariability: boolean;
  
  // Sensitivity (4 questions)
  soilDegradation: boolean;
  waterScarcity: boolean;
  pestDisease: boolean;
  cropDiversity: boolean;
  
  // Adaptive Capacity (5 questions)
  weatherInfo: boolean;
  alternativeIncome: boolean;
  marketAccess: boolean;
  trainingAccess: boolean;
  communitySupport: boolean;
  
  // Mitigation Practices (5 questions)
  soilConservation: boolean;
  waterHarvesting: boolean;
  agroforestry: boolean;
  organicPractices: boolean;
  climateSmartSeeds: boolean;
  
  // Financial Resilience (5 questions)
  savingsAccess: boolean;
  creditAccess: boolean;
  insuranceAccess: boolean;
  cooperativeMember: boolean;
  recordKeeping: boolean;
}

export interface ClimateScoreResult {
  totalScore: number;
  scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent';

  categoryScores: {
    exposure: number;
    sensitivity: number;
    adaptiveCapacity: number;
    mitigationPractices: number;
    financialResilience: number;
  };
}