import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolioContextObject';

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider.');
  }

  return context;
};
