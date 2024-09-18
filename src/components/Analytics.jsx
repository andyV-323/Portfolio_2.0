import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("GTM-5LGWK5MS"); // Replace with your Google Analytics Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
