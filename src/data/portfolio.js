import seedContent from './portfolio-content.json';
import { normalizePortfolioContent } from '../lib/portfolioContent';

export const fallbackPortfolioContent = normalizePortfolioContent(seedContent);

export const {
  profile,
  metrics,
  stack,
  capabilities,
  projects,
  workflow,
  experience,
  credentials,
} = fallbackPortfolioContent;
