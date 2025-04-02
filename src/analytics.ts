import ReactGA from 'react-ga4';

// Replace G-XXXXXXXXXX with your actual Measurement ID
export const initGA = () => {
  ReactGA.initialize('G-5GEN490J94');
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Event tracking
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
}; 