import ReactGA from "react-ga4";

export const GApageView = async (page: string) => {
  if (ReactGA.isInitialized) 
  ReactGA.send({ hitType: "pageview", page: page, title: page });
};

export const GAInitializate = (userId?: string) => {
  if (!ReactGA.isInitialized) {
    ReactGA.initialize(
      `${import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS}`
    );
  }
};
/*export const GAmodalView = (modal: string) => {
  ReactGA.modalview(modal)
}*/

export const GAevent = async (action: string, category: string, label: any) => {
  if (ReactGA.isInitialized) 
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
