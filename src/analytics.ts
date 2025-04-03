import ReactGA from 'react-ga4';

// Replace G-XXXXXXXXXX with your actual Measurement ID
export const initGA = () => {
  ReactGA.initialize('G-5GEN490J94', {
    gaOptions: {
      debug_mode: true,
      send_page_view: false
    }
  });
};

export const logPageView = () => {
  const page = window.location.pathname + window.location.hash;
  ReactGA.send({
    hitType: "pageview",
    page: page,
    title: document.title,
    location: window.location.href
  });
};

// Event tracking
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// User tracking
export const setUser = (userId: string) => {
  ReactGA.set({
    userId: userId
  });
}; 