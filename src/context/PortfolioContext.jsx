import { useEffect, useMemo, useState } from 'react';
import seedContent from '../data/portfolio-content.json';
import { normalizePortfolioContent } from '../lib/portfolioContent';
import { PortfolioContext } from './portfolioContextObject';

export const PortfolioProvider = ({ children }) => {
  const [rawContent, setRawContent] = useState(seedContent);
  const [liveStatus, setLiveStatus] = useState('static');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/portfolio')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Portfolio API unavailable.');
        }
        return response.json();
      })
      .then((content) => {
        if (!cancelled) {
          setRawContent(content);
          setLiveStatus('live');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLiveStatus('static');
        }
      });

    const events = new EventSource('/api/events');

    events.addEventListener('portfolio', (event) => {
      setRawContent(JSON.parse(event.data));
      setLiveStatus('live');
    });

    events.onerror = () => {
      setLiveStatus((status) => (status === 'live' ? 'reconnecting' : 'static'));
    };

    return () => {
      cancelled = true;
      events.close();
    };
  }, []);

  const content = useMemo(() => normalizePortfolioContent(rawContent), [rawContent]);
  const value = useMemo(
    () => ({
      content,
      liveStatus,
      rawContent,
      setRawContent,
    }),
    [content, liveStatus, rawContent],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
