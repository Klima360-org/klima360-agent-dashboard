import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'critical-bundle',
    title: 'Education + Climate Advisory + Savings Plan',
    description: 'Comprehensive support package including climate education workshops, personalized advisory services, and guided savings plan to build financial resilience.',
    scoreBand: 'critical'
  },
  {
    id: 'moderate-bundle',
    title: 'Insurance Bundle + Input Loan Offer',
    description: 'Weather-indexed crop insurance combined with flexible input financing to protect against climate risks while improving productivity.',
    scoreBand: 'moderate'
  },
  {
    id: 'strong-bundle',
    title: 'Credit Product + Productivity Kit',
    description: 'Access to agricultural credit facilities and premium productivity enhancement tools for climate-resilient farming expansion.',
    scoreBand: 'strong'
  }
];

export const getProductByScoreBand = (scoreBand: 'critical' | 'moderate' | 'strong'): Product => {
  return PRODUCTS.find(product => product.scoreBand === scoreBand) || PRODUCTS[0];
};