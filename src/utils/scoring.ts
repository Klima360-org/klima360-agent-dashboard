import { ClimateScoreAnswers, ClimateScoreResult } from '@/types';

export const calculateClimateScore = (answers: ClimateScoreAnswers): ClimateScoreResult => {
  // Each category has specific questions with different weightings
  const exposure = (
    (answers.droughtFrequency ? 1 : 0) +
    (answers.floodingRisk ? 1 : 0) +
    (answers.temperatureExtremes ? 1 : 0) +
    (answers.rainfallVariability ? 1 : 0)
  );

  const sensitivity = (
    (answers.soilDegradation ? 0 : 1) + // Inverted (good if false)
    (answers.waterScarcity ? 0 : 1) + // Inverted
    (answers.pestDisease ? 0 : 1) + // Inverted
    (answers.cropDiversity ? 1 : 0) // Good if true
  );

  const adaptiveCapacity = (
    (answers.weatherInfo ? 1 : 0) +
    (answers.alternativeIncome ? 1 : 0) +
    (answers.marketAccess ? 1 : 0) +
    (answers.trainingAccess ? 1 : 0) +
    (answers.communitySupport ? 1 : 0)
  );

  const mitigationPractices = (
    (answers.soilConservation ? 1 : 0) +
    (answers.waterHarvesting ? 1 : 0) +
    (answers.agroforestry ? 1 : 0) +
    (answers.organicPractices ? 1 : 0) +
    (answers.climateSmartSeeds ? 1 : 0)
  );

  const financialResilience = (
    (answers.savingsAccess ? 1 : 0) +
    (answers.creditAccess ? 1 : 0) +
    (answers.insuranceAccess ? 1 : 0) +
    (answers.cooperativeMember ? 1 : 0) +
    (answers.recordKeeping ? 1 : 0)
  );

  // Calculate weighted score (exposure is negative, others positive)
  const totalScore = Math.round(
    ((4 - exposure) * 3 + // Exposure (inverted, weighted 3x)
    sensitivity * 4 + // Sensitivity (weighted 4x)
    adaptiveCapacity * 4 + // Adaptive Capacity (weighted 4x)
    mitigationPractices * 4 + // Mitigation (weighted 4x)
    financialResilience * 4) / 23 * 100 // Financial (weighted 4x)
  );

  // Determine score band
  let scoreBand: 'critical' | 'moderate' | 'strong';
  if (totalScore >= 71) {
    scoreBand = 'strong';
  } else if (totalScore >= 41) {
    scoreBand = 'moderate';
  } else {
    scoreBand = 'critical';
  }

  return {
    totalScore,
    scoreBand,
    categoryScores: {
      exposure: Math.round((4 - exposure) / 4 * 100),
      sensitivity: Math.round(sensitivity / 4 * 100),
      adaptiveCapacity: Math.round(adaptiveCapacity / 5 * 100),
      mitigationPractices: Math.round(mitigationPractices / 5 * 100),
      financialResilience: Math.round(financialResilience / 5 * 100)
    }
  };
};

export const getScoreBandColor = (scoreBand: 'critical' | 'moderate' | 'strong'): string => {
  switch (scoreBand) {
    case 'critical':
      return 'text-score-critical bg-score-critical/10 border-score-critical/20';
    case 'moderate':
      return 'text-score-moderate bg-score-moderate/10 border-score-moderate/20';
    case 'strong':
      return 'text-score-strong bg-score-strong/10 border-score-strong/20';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

export const getScoreBandLabel = (scoreBand: 'critical' | 'moderate' | 'strong'): string => {
  switch (scoreBand) {
    case 'critical':
      return 'Critical Risk';
    case 'moderate':
      return 'Moderate Risk';
    case 'strong':
      return 'Strong Resilience';
    default:
      return 'Unknown';
  }
};