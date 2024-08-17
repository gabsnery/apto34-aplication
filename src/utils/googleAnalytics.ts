import ReactGA from "react-ga4";

export const GApageView = async (page: string) => {
  ReactGA.send({ hitType: "pageview", page: page, title: page });
};

export const GAInitializate = (userId?: string) => {
  console.log(
    "🚀 ~ GAInitializate ~ ReactGA.isInitialized:",
    ReactGA.isInitialized
  );
  if (!ReactGA.isInitialized)
    ReactGA.initialize(`${import.meta.env.REACT_APP_GOOGLE_ANALYTICS}`, {
      gaOptions: {
        userId: userId || 999999,
      },
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
