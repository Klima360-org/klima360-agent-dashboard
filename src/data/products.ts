import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'very-critical-bundle',
    title: 'Emergency Support + Foundational Training',
    description:
      'Immediate relief support, basic climate education, and community mentorship to stabilize the farmer’s situation and prevent severe losses.',
    scoreBand: 'veryCritical'
  },
  {
    id: 'low-bundle',
    title: 'Education + Climate Advisory + Savings Plan',
    description:
      'Comprehensive support package including climate education workshops, personalized advisory services, and guided savings plan to build financial resilience.',
    scoreBand: 'low'
  },
  {
    id: 'moderate-bundle',
    title: 'Insurance Bundle + Input Loan Offer',
    description:
      'Weather-indexed crop insurance combined with flexible input financing to protect against climate risks while improving productivity.',
    scoreBand: 'moderate'
  },
  {
    id: 'good-bundle',
    title: 'Credit Product + Productivity Kit',
    description:
      'Access to agricultural credit facilities and premium productivity enhancement tools for climate-resilient farming expansion.',
    scoreBand: 'good'
  },
  {
    id: 'excellent-bundle',
    title: 'Market Linkages + Leadership Training',
    description:
      'Advanced package connecting farmers to premium markets, export opportunities, and leadership development to become community climate champions.',
    scoreBand: 'excellent'
  }
];

export const getProductByScoreBand = (scoreBand: 'veryCritical' | 'low' | 'moderate' | 'good' | 'excellent'): Product => {
  return PRODUCTS.find(product => product.scoreBand === scoreBand) || PRODUCTS[0];
};