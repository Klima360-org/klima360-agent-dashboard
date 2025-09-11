import { ClimateScoreAnswers, ClimateScoreResult } from '@/types';

export const calculateClimateScore = (answers: ClimateScoreAnswers): ClimateScoreResult => {
  const exposureRaw = (
    (answers.droughtFrequency ? 1 : 0) +
    (answers.floodingRisk ? 1 : 0) +
    (answers.temperatureExtremes ? 1 : 0) +
    (answers.rainfallVariability ? 1 : 0)
  );

  const sensitivityRaw = (
    (answers.soilDegradation ? 0 : 1) +
    (answers.waterScarcity ? 0 : 1) +
    (answers.pestDisease ? 0 : 1) +
    (answers.cropDiversity ? 1 : 0)
  );

  const adaptiveCapacityRaw = (
    (answers.weatherInfo ? 1 : 0) +
    (answers.alternativeIncome ? 1 : 0) +
    (answers.marketAccess ? 1 : 0) +
    (answers.trainingAccess ? 1 : 0) +
    (answers.communitySupport ? 1 : 0)
  );

  const mitigationPracticesRaw = (
    (answers.soilConservation ? 1 : 0) +
    (answers.waterHarvesting ? 1 : 0) +
    (answers.agroforestry ? 1 : 0) +
    (answers.organicPractices ? 1 : 0) +
    (answers.climateSmartSeeds ? 1 : 0)
  );

  const financialResilienceRaw = (
    (answers.savingsAccess ? 1 : 0) +
    (answers.creditAccess ? 1 : 0) +
    (answers.insuranceAccess ? 1 : 0) +
    (answers.cooperativeMember ? 1 : 0) +
    (answers.recordKeeping ? 1 : 0)
  );

  // Normalize each to percentage
  const exposure = Math.round(((4 - exposureRaw) / 4) * 100); // inverted
  const sensitivity = Math.round((sensitivityRaw / 4) * 100);
  const adaptiveCapacity = Math.round((adaptiveCapacityRaw / 5) * 100);
  const mitigationPractices = Math.round((mitigationPracticesRaw / 5) * 100);
  const financialResilience = Math.round((financialResilienceRaw / 5) * 100);

  // Total score = average of category scores
  const totalScore = Math.round(
    (exposure + sensitivity + adaptiveCapacity + mitigationPractices + financialResilience) / 5
  );

  // Determine score band
  let scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent';
  if (totalScore <= 20) {
    scoreBand = 'veryCritical';
  } else if (totalScore <= 40) {
    scoreBand = 'low';
  } else if (totalScore <= 60) {
    scoreBand = 'moderate';
  } else if (totalScore <= 80) {
    scoreBand = 'good';
  } else {
    scoreBand = 'excellent';
  }

  return {
    totalScore,
    scoreBand,
    categoryScores: {
      exposure,
      sensitivity,
      adaptiveCapacity,
      mitigationPractices,
      financialResilience
    }
  };
};



export const getScoreBandColor = (
  scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent'
): string => {
  switch (scoreBand) {
    case 'veryCritical':
      return 'text-red-700 bg-red-100 border-red-200'; // 🔴 Very Critical
    case 'low':
      return 'text-orange-700 bg-orange-100 border-orange-200'; // 🟠 Low
    case 'moderate':
      return 'text-yellow-700 bg-yellow-100 border-yellow-200'; // 🟡 Moderate
    case 'good':
      return 'text-green-700 bg-green-100 border-green-200'; // 🟢 Good
    case 'excellent':
      return 'text-blue-700 bg-blue-100 border-blue-200'; // 🔵 Excellent
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

export const getScoreBandLabel = (
  scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent'
): string => {
  switch (scoreBand) {
    case 'veryCritical':
      return 'Very Critical';
    case 'low':
      return 'Low';
    case 'moderate':
      return 'Moderate';
    case 'good':
      return 'Good';
    case 'excellent':
      return 'Excellent';
    default:
      return 'Unknown';
  }
};
