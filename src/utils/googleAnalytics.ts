import ReactGA from "react-ga4";

export const GApageView = async (page: string) => {
  ReactGA.send({ hitType: "pageview", page: page, title: page });
};

export const GAInitializate = (userId?: string) => {
  if (!ReactGA.isInitialized)
    ReactGA.initialize(`${import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS}`, {
      gaOptions: {
        userId: userId || 999999,
      },
      testMode:true
    });
    
};
/*export const GAmodalView = (modal: string) => {
  ReactGA.modalview(modal)
}*/

export const GAevent = async (action: string, category: string, label: any) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
