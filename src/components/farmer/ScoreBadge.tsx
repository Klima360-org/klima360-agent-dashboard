import { Badge } from '@/components/ui/badge';
import { getScoreBandColor, getScoreBandLabel } from '@/utils/scoring';

interface ScoreBadgeProps {
  score: number;
  scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent';
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreBadge = ({ score, scoreBand, size = 'md' }: ScoreBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant="outline" 
      className={`
        ${getScoreBandColor(scoreBand)} 
        ${sizeClasses[size]}
        font-semibold border-2
      `}
    >
      {score}/100 - {getScoreBandLabel(scoreBand)}
    </Badge>
  );
};